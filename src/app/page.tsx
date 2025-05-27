'use client';

import React, { useState } from 'react';
import { PropertyForm } from '@/components/PropertyForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { PropertyData, GeneratedListings } from '@/types';
import { Home as HomeIcon, Sparkles, Clock, TrendingUp } from 'lucide-react';

export default function Home() {
  const [listings, setListings] = useState<GeneratedListings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (propertyData: PropertyData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate listings');
      }

      const result = await response.json();
      setListings(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate listings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setListings(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Property Listing</h1>
                <p className="text-sm text-gray-500">Professional listings in 30 seconds</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-green-500" />
                <span>30 Second Generation</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>Professional Quality</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!listings && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Generate Professional Property Listings
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Transform property details into compelling MLS descriptions, social media posts, and email campaigns using advanced AI
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <HomeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">MLS Ready</h3>
                  <p className="text-blue-100 text-sm">Professional descriptions for MLS and Zillow listings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Social Media</h3>
                  <p className="text-blue-100 text-sm">Engaging posts with emojis and hashtags</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Campaigns</h3>
                  <p className="text-blue-100 text-sm">Urgent, personalized email newsletters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!listings ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Property Information</h3>
                <p className="text-gray-600">Enter your property details to generate professional listings</p>
              </div>
              <div className="p-8">
                <PropertyForm onSubmit={handleGenerate} isLoading={isLoading} />
              </div>
            </div>
          </div>
        ) : (
          <ResultsDisplay listings={listings} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <HomeIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI Property Listing</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing real estate marketing with AI-powered listing generation. 
                Save time, increase engagement, and close more deals.
              </p>
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>• 30-second generation</span>
                <span>• Professional quality</span>
                <span>• Multiple formats</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>MLS Descriptions</li>
                <li>Social Media Posts</li>
                <li>Email Campaigns</li>
                <li>Copy to Clipboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Agents</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Save 30+ minutes per listing</li>
                <li>Consistent quality</li>
                <li>Multiple marketing formats</li>
                <li>Professional language</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 AI Property Listing. Powered by Google Gemini AI.</p>
            <p className="mt-2 text-xs">AI-generated content may contain errors. Please review and verify before use.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
