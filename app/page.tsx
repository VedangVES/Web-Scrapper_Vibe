'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, AlertCircle, CheckCircle, Brain, Zap, Globe, MessageSquare, Eye } from 'lucide-react';
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
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 shadow-2xl text-white p-6 z-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            WebScraper
          </div>
          <p className="text-blue-100 text-sm">AI-Powered Content Extraction</p>
        </motion.div>

        <nav className="space-y-4">
          {[
            { icon: '📊', label: 'Dashboard', href: '/stats', active: false },
            { icon: '✨', label: 'New Scrape', href: '#', active: true },
            { icon: '📁', label: 'My Projects', href: '#', active: false },
            { icon: '⚙️', label: 'Settings', href: '#', active: false },
            { icon: '❓', label: 'Help & Support', href: '#', active: false },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ x: 5 }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                item.active
                  ? 'bg-white/30 border-2 border-white'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Create New Scrape</h1>
            <p className="text-gray-600 mt-2">Extract and analyze content with AI</p>
          </div>
          <Link href="/stats">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              📊 View Dashboard
            </motion.button>
          </Link>
        </div>

        {/* Input Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 mb-8"
        >
          {/* Mode Selection */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-800 mb-4">Scraping Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMode('basic');
                  setShowPromptInput(false);
                  setCustomPrompt('');
                }}
                className={`p-6 rounded-xl font-bold text-lg transition-all border-2 ${
                  mode === 'basic'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-700 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <Globe className="w-6 h-6 mx-auto mb-2" />
                Quick Scrape
                <p className="text-sm opacity-90 mt-1">Basic extraction</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('nerd')}
                className={`p-6 rounded-xl font-bold text-lg transition-all border-2 ${
                  mode === 'nerd'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white border-purple-700 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-purple-400'
                }`}
              >
                <Brain className="w-6 h-6 mx-auto mb-2" />
                AI Scrape
                <p className="text-sm opacity-90 mt-1">Deep analysis</p>
              </motion.button>
            </div>
          </div>

          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-3">Target URL</label>
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

          {/* Data Type Selection */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-3">Data Type</label>
            <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-base bg-white">
              <option>Text, Images, Tables</option>
              <option>Text Only</option>
              <option>Images Only</option>
              <option>Tables Only</option>
            </select>
          </div>

          {/* Custom Prompt for Nerd Mode */}
          <AnimatePresence>
            {mode === 'nerd' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <button
                  onClick={() => setShowPromptInput(!showPromptInput)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-3 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  {showPromptInput ? 'Hide' : 'Customize'} AI Instructions
                </button>
                
                {showPromptInput && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Tell Gemini AI what to analyze... (e.g., 'Extract all product prices and reviews')"
                      className="w-full px-4 py-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                      rows={4}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrape Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrape}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
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

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8 p-6 bg-red-50 border-2 border-red-500 rounded-xl"
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
              className="space-y-6"
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
