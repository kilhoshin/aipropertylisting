import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { PropertyData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const propertyData: PropertyData = await request.json();

    // Validate required fields
    if (!propertyData.address || !propertyData.price) {
      return NextResponse.json(
        { error: 'Address and price are required' },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      // Return mock data for testing when API key is not available
      return NextResponse.json({
        mls: `Beautiful ${propertyData.bedrooms} bedroom, ${propertyData.bathrooms} bathroom home located at ${propertyData.address}. This stunning property offers ${propertyData.squareFeet ? propertyData.squareFeet.toLocaleString() + ' square feet of ' : ''}comfortable living space${propertyData.yearBuilt ? ` built in ${propertyData.yearBuilt}` : ''}. Priced at $${propertyData.price.toLocaleString()}, this home features ${propertyData.specialFeatures.length > 0 ? propertyData.specialFeatures.join(', ').toLowerCase() : 'modern amenities'}. Perfect for families seeking quality and comfort in a desirable location. Don't miss this opportunity to own a piece of paradise. Schedule your viewing today and experience the charm and elegance this property has to offer.`,
        
        socialMedia: `🏠 JUST LISTED! 🏠\n\n✨ ${propertyData.bedrooms}BR/${propertyData.bathrooms}BA Dream Home\n💰 $${propertyData.price.toLocaleString()}\n📍 ${propertyData.address}\n\n🔥 Features:\n${propertyData.specialFeatures.slice(0, 3).map(f => `• ${f}`).join('\n')}\n\nDon't wait - this beauty won't last! 🔥\n\n#RealEstate #JustListed #DreamHome #PropertyForSale #NewListing`,
        
        email: {
          subject: `🏠 URGENT: ${propertyData.bedrooms}BR Home - Won't Last!`,
          body: `Hi there!\n\nI wanted to reach out immediately about an incredible opportunity that just hit the market.\n\nThis stunning ${propertyData.bedrooms} bedroom, ${propertyData.bathrooms} bathroom home at ${propertyData.address} is priced to move at $${propertyData.price.toLocaleString()}.\n\nWhat makes this special:\n${propertyData.specialFeatures.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nHomes like this in this price range are selling within days. I've already had 3 inquiries since this morning.\n\nCan we schedule a viewing this week? I have availability tomorrow and Thursday.\n\nDon't let this one slip away!\n\nBest regards,\nYour Real Estate Agent`
        }
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create property description for AI
    const propertyDescription = `
Property Details:
- Address: ${propertyData.address}
- Price: $${propertyData.price.toLocaleString()}
- Bedrooms: ${propertyData.bedrooms}
- Bathrooms: ${propertyData.bathrooms}
${propertyData.squareFeet ? `- Square Feet: ${propertyData.squareFeet.toLocaleString()}` : ''}
${propertyData.yearBuilt ? `- Year Built: ${propertyData.yearBuilt}` : ''}
${propertyData.specialFeatures.length > 0 ? `- Special Features: ${propertyData.specialFeatures.join(', ')}` : ''}
`;

    // Generate MLS/Professional version
    const mlsPrompt = `
Create a professional MLS/Zillow property listing description for this property:

${propertyDescription}

Requirements:
- 150-200 words
- Professional, detailed, factual tone
- Paragraph style with key features highlighted
- Focus on value propositions and standout features
- Use real estate industry language
- No emojis or casual language
`;

    const mlsResult = await model.generateContent(mlsPrompt);
    const mlsText = mlsResult.response.text();

    // Generate Social Media version
    const socialPrompt = `
Create a social media property listing post for this property:

${propertyDescription}

Requirements:
- 80-120 words
- Exciting, engaging tone with relevant emojis
- Bullet point format
- Include relevant hashtags at the end
- Create urgency and excitement
- Use emojis strategically throughout
`;

    const socialResult = await model.generateContent(socialPrompt);
    const socialText = socialResult.response.text();

    // Generate Email Newsletter version
    const emailPrompt = `
Create an email newsletter property listing for this property:

${propertyDescription}

Requirements:
- Generate both a compelling subject line and email body
- Subject line: Urgent, FOMO-inducing (under 50 characters)
- Email body: 100-150 words, personal tone, create urgency
- Format as JSON with "subject" and "body" fields
- Focus on scarcity and immediate action needed
`;

    const emailResult = await model.generateContent(emailPrompt);
    let emailData;
    
    try {
      // Try to parse as JSON first
      const emailText = emailResult.response.text();
      const jsonMatch = emailText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        emailData = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: split by common patterns
        const lines = emailText.split('\n').filter(line => line.trim());
        const subjectLine = lines.find(line => line.toLowerCase().includes('subject')) || lines[0];
        const bodyStart = lines.findIndex(line => line.toLowerCase().includes('body') || line.toLowerCase().includes('email'));
        
        emailData = {
          subject: subjectLine.replace(/subject:?/i, '').trim().replace(/['"]/g, ''),
          body: lines.slice(bodyStart + 1).join('\n').trim()
        };
      }
    } catch (error) {
      // Final fallback
      const emailText = emailResult.response.text();
      const lines = emailText.split('\n').filter(line => line.trim());
      emailData = {
        subject: `🏠 Don't Miss This ${propertyData.bedrooms}BR/${propertyData.bathrooms}BA Home!`,
        body: lines.join('\n').trim()
      };
    }

    return NextResponse.json({
      mls: mlsText.trim(),
      socialMedia: socialText.trim(),
      email: emailData
    });

  } catch (error) {
    console.error('Error generating listings:', error);
    return NextResponse.json(
      { error: 'Failed to generate listings' },
      { status: 500 }
    );
  }
}
