# AI Property Listing

**Transform property details into professional listings in 30 seconds**

AI Property Listing is an AI-powered web application that generates professional property listings for real estate agents. Simply input property details and get three professionally crafted versions: MLS/Zillow descriptions, social media posts, and email campaigns.

## 🚀 Features

### Core Functionality
- **Property Input Form**: Easy-to-use form for entering property details
- **AI-Powered Generation**: Uses Google Gemini 2.5 Flash for high-quality content
- **Multiple Formats**: Generates 3 different listing styles:
  - **MLS/Professional**: 150-200 words, formal tone for MLS and Zillow
  - **Social Media**: 80-120 words with emojis and hashtags
  - **Email Newsletter**: Urgent, personal tone with subject line and body

### User Experience
- **30-Second Generation**: Fast AI processing
- **Copy to Clipboard**: One-click copying for each listing type
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional UI**: Clean, modern interface inspired by Zillow

## 🎯 Target Audience

**US Real Estate Agents** who want to:
- Save 30+ minutes per property listing
- Maintain consistent, professional quality
- Generate multiple marketing formats quickly
- Focus on selling instead of writing

## 💰 Business Model

- **Subscription**: $49/month
- **Value Proposition**: Save 30+ minutes per listing
- **Target Market**: 2+ million real estate agents in the US

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **AI**: Google Gemini 2.5 Flash API
- **Deployment**: Vercel
- **Database**: None needed for MVP

## 📋 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-property-listing.git
   cd ai-property-listing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Add your Google Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

1. **Enter Property Details**
   - Address (required)
   - Price (required)
   - Bedrooms, bathrooms
   - Square feet, year built
   - Special features (checkboxes)

2. **Generate Listings**
   - Click "Generate Professional Listings"
   - Wait ~30 seconds for AI processing

3. **Copy and Use**
   - Review the three generated formats
   - Copy any listing with one click
   - Paste into MLS, social media, or email

## 📁 Project Structure

```
src/
├── app/
│   ├── api/generate-listings/route.ts    # API endpoint for AI generation
│   ├── page.tsx                          # Main application page
│   └── layout.tsx                        # Root layout
├── components/
│   ├── PropertyForm.tsx                  # Property input form
│   └── ResultsDisplay.tsx                # Generated listings display
└── types/
    └── index.ts                          # TypeScript interfaces
```

## 🔧 Development

### Adding New Features
- Property details are defined in `src/types/index.ts`
- AI prompts are in `src/app/api/generate-listings/route.ts`
- UI components use Tailwind CSS for styling

### Environment Variables
- `GEMINI_API_KEY`: Required for Google Gemini API access
- Create `.env.local` file based on `env.example`

### Deployment
Ready for deployment on Vercel:
```bash
npm run build
```

## 🎨 Design System

- **Colors**: Blue primary, professional grays
- **Typography**: Modern, readable fonts
- **Layout**: Card-based, responsive grid
- **Icons**: Lucide React icons
- **Animations**: Subtle hover effects and transitions

## 🔮 Future Enhancements

### Phase 2: HTML Email Generator
- Image upload capability
- Responsive email templates
- Email preview functionality

### Phase 3: Advanced Features
- User accounts and saved listings
- Team collaboration features
- Analytics and performance tracking
- Custom branding options

## 📊 Performance

- **Generation Time**: ~30 seconds
- **Accuracy**: High-quality, professional content
- **Reliability**: Fallback content when API unavailable
- **Scalability**: Serverless architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email giro.shin@gmail.com or visit our documentation.

---

**AI Property Listing** - Revolutionizing real estate marketing with AI-powered listing generation.
