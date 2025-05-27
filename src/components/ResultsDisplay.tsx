'use client';

import React, { useState } from 'react';
import { GeneratedListings } from '@/types';
import { Copy, CheckCircle, ArrowLeft, FileText, MessageSquare, Mail, Sparkles } from 'lucide-react';

interface ResultsDisplayProps {
  listings: GeneratedListings;
  onReset: () => void;
}

export function ResultsDisplay({ listings, onReset }: ResultsDisplayProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const CopyButton = ({ text, copyKey, label }: { text: string; copyKey: string; label: string }) => (
    <button
      onClick={() => copyToClipboard(text, copyKey)}
      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      {copiedStates[copyKey] ? (
        <>
          <CheckCircle className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy {label}</span>
        </>
      )}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Listings Generated Successfully!</h2>
                <p className="text-gray-600">Your professional property listings are ready to use</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* MLS/Professional Listing */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">MLS/Professional</h3>
                <p className="text-blue-100 text-sm">Perfect for MLS and Zillow</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {listings.mls}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {listings.mls.split(' ').length} words
              </span>
              <CopyButton text={listings.mls} copyKey="mls" label="MLS" />
            </div>
          </div>
        </div>

        {/* Social Media Listing */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Social Media</h3>
                <p className="text-purple-100 text-sm">Instagram, Facebook, Twitter</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {listings.socialMedia}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {listings.socialMedia.split(' ').length} words
              </span>
              <CopyButton text={listings.socialMedia} copyKey="social" label="Post" />
            </div>
          </div>
        </div>

        {/* Email Newsletter */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden lg:col-span-2 xl:col-span-1">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email Campaign</h3>
                <p className="text-orange-100 text-sm">Newsletter & direct outreach</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Email Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Line
              </label>
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-gray-800 text-sm font-medium">
                  {typeof listings.email === 'object' ? listings.email.subject : 'Professional Email Subject'}
                </p>
              </div>
              <CopyButton 
                text={typeof listings.email === 'object' ? listings.email.subject : listings.email} 
                copyKey="emailSubject" 
                label="Subject" 
              />
            </div>

            {/* Email Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Body
              </label>
              <div className="bg-gray-50 rounded-lg p-4 mb-3 max-h-48 overflow-y-auto">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {typeof listings.email === 'object' ? listings.email.body : listings.email}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {(typeof listings.email === 'object' ? listings.email.body : listings.email).split(' ').length} words
                </span>
                <CopyButton 
                  text={typeof listings.email === 'object' ? listings.email.body : listings.email} 
                  copyKey="emailBody" 
                  label="Body" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <span>Pro Tips for Maximum Impact</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">MLS Listings</h4>
            <p className="text-sm text-gray-600">
              Use this for official MLS entries, Zillow, and professional real estate websites. 
              The formal tone builds trust with serious buyers.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Social Media</h4>
            <p className="text-sm text-gray-600">
              Perfect for Instagram, Facebook, and Twitter posts. The emojis and hashtags 
              increase engagement and reach a broader audience.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Email Campaigns</h4>
            <p className="text-sm text-gray-600">
              Use for direct client outreach and newsletter campaigns. The urgent tone 
              creates FOMO and encourages quick action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
