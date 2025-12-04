'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, AlertCircle, CheckCircle, Brain, Zap, Globe, MessageSquare, Download, Eye, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'basic' | 'nerd'>('basic');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPromptInput, setShowPromptInput] = useState(false);

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url, 
          mode,
          customPrompt: showPromptInput && customPrompt ? customPrompt : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to scrape website');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Left - Logo */}
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">Scraper AI</span>
          </div>
          
          {/* Right - Navigation Links */}
          <div className="flex items-center gap-8">
            <button className="text-gray-700 font-semibold hover:text-purple-600 transition-colors">Scraper</button>
            <Link href="/stats">
              <button className="text-gray-700 font-semibold hover:text-purple-600 transition-colors">Statistics</button>
            </Link>
            <button className="text-gray-700 hover:text-purple-600 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-4 pb-8">

        {/* Main Input Form Card - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 border border-gray-200"
        >
          {/* Title */}
          <h1 className="text-5xl font-bold text-center text-purple-600 mb-3">Web Scraper</h1>
          <p className="text-center text-gray-600 text-lg mb-8">Extract data from any website with AI-powered analysis</p>

          {/* URL Input */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">Website URL</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>
          </div>

          {/* Extraction Options */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">Extraction Options</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-gray-700 font-medium">Extract Images</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-gray-700 font-medium">Analyze Sentiment</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-gray-700 font-medium">Extract Links</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-gray-700 font-medium">Extract Key Phrases</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-gray-700 font-medium">Use Gemini</span>
              </label>
            </div>
          </div>

          {/* Scrape Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrape}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Scraping in progress...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                <span>Start Scraping</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Recent Jobs Section - Placeholder */}
        {!error && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Jobs</h2>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No recent jobs</p>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl mt-6 p-6 bg-red-50 border-2 border-red-500 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-700 font-bold text-lg">Scraping Failed</h3>
                  <p className="text-red-600 mt-2">{error}</p>
                  <ul className="mt-3 text-sm text-red-600 list-disc list-inside space-y-1">
                    <li>Verify the URL is correct and accessible</li>
                    <li>Check if the website blocks automated access</li>
                    <li>Try again in a few moments</li>
                  </ul>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
          {result && result.status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl space-y-6 mt-6"
            >
              {/* Success Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-green-700 font-bold text-xl">
                        Scraping Completed Successfully!
                      </h3>
                      <p className="text-green-600 text-sm">
                        Extracted {result.metadata.wordCount.toLocaleString()} words in {(result.metadata.scrapeDuration / 1000).toFixed(2)}s
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setResult(null);
                      setUrl('');
                      setCustomPrompt('');
                    }}
                    className="px-6 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded-lg transition-all"
                  >
                    New Scrape
                  </motion.button>
                </div>
              </motion.div>

              {/* Basic Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-100"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">{result.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{result.description}</p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200">
                    <p className="text-gray-600 text-sm font-semibold mb-2">📊 Word Count</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {(result.metadata.wordCount / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                    <p className="text-gray-600 text-sm font-semibold mb-2">🖼️ Images</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {result.metadata.imageCount}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                    <p className="text-gray-600 text-sm font-semibold mb-2">🔗 Links</p>
                    <p className="text-3xl font-bold text-green-600">
                      {result.metadata.linkCount}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg border-2 border-orange-200">
                    <p className="text-gray-600 text-sm font-semibold mb-2">⏱️ Duration</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {(result.metadata.scrapeDuration / 1000).toFixed(2)}s
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Content Preview</h3>
                </div>
                <div className="p-8 max-h-96 overflow-y-auto bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {result.content.substring(0, 1500)}
                    {result.content.length > 1500 && '\n\n[Content truncated...]'}
                  </p>
                </div>
              </motion.div>

              {/* AI Analysis - Nerd Mode Only */}
              {mode === 'nerd' && result.aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center gap-3">
                    <Brain className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Gemini AI Analysis</h3>
                  </div>
                  <div className="p-8 bg-gray-50 border-t-2 border-gray-200">
                    <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {result.aiAnalysis}
                      </p>
                    </div>
                    {customPrompt && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <p className="text-xs text-purple-600 font-semibold mb-1">💡 Custom Instructions:</p>
                        <p className="text-sm text-purple-700">{customPrompt}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Extracted Data - Nerd Mode Only */}
              {mode === 'nerd' && result.extractedData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Extracted Data</h3>
                  </div>
                  <div className="p-8 bg-gray-50 border-t-2 border-gray-200 space-y-8">
                    {/* Headings */}
                    {result.extractedData.headings?.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <span className="text-2xl">📝</span>
                          Headings ({result.extractedData.headings.length})
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {result.extractedData.headings.slice(0, 8).map((heading: string, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-colors">
                              <p className="text-gray-700 font-medium">{heading}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Images */}
                    {result.extractedData.images?.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <span className="text-2xl">🖼️</span>
                          Images ({result.extractedData.images.length})
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {result.extractedData.images.slice(0, 6).map((img: any, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-pink-400 transition-colors">
                              <p className="text-gray-700 font-medium text-sm mb-2">Alt: {img.alt || 'N/A'}</p>
                              <p className="text-gray-600 text-xs truncate break-all">{img.src}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
