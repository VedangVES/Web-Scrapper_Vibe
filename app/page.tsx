'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Loader2, AlertCircle, CheckCircle, Brain, Zap, Globe, MessageSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">WebScraper AI</span>
            </motion.div>
            <Link href="/stats">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
              >
                View Stats
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            Intelligent Web Scraping
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">
            Powered by <span className="text-purple-400 font-bold">Gemini AI</span> for advanced content analysis
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Any Website</span>
            </div>
          </div>
        </motion.div>

        {/* Scraper Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Mode Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMode('basic');
                setShowPromptInput(false);
                setCustomPrompt('');
              }}
              className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                mode === 'basic'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Globe className="w-5 h-5" />
              <div className="text-left">
                <div>Quick Scrape</div>
                <div className="text-xs opacity-80">Basic extraction</div>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode('nerd')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                mode === 'nerd'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Brain className="w-5 h-5" />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span>AI Scrape</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs opacity-80">Deep AI analysis</div>
              </div>
            </motion.button>
          </div>

          {/* URL Input */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                className="w-full pl-12 pr-4 py-5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>

            {/* Custom Prompt for Nerd Mode */}
            <AnimatePresence>
              {mode === 'nerd' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <button
                    onClick={() => setShowPromptInput(!showPromptInput)}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {showPromptInput ? 'Hide' : 'Customize'} AI Instructions
                    </span>
                  </button>
                  
                  {showPromptInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5 z-10" />
                      <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Tell Gemini AI what to analyze... (e.g., 'Extract all product prices and reviews', 'Summarize the main arguments', 'Find contact information')"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        rows={4}
                      />
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <Sparkles className="w-3 h-3" />
                        <span>Custom instructions help Gemini understand exactly what you need</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrape}
              disabled={loading}
              className="w-full px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
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
          </div>

          {/* Mode Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-5 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/10"
            >
              <p className="text-gray-200 text-sm leading-relaxed">
                {mode === 'basic' ? (
                  <>
                    <span className="font-semibold text-blue-400">⚡ Quick Scrape Mode:</span> Extracts essential information including title, description, text content, images, links, and metadata. Perfect for fast data collection.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-purple-400">🧠 AI Scrape Mode:</span> Unleashes Gemini AI to perform deep content analysis, extract structured data, identify key insights, perform sentiment analysis, and provide intelligent summaries. {!showPromptInput && <span className="text-purple-300 cursor-pointer hover:underline" onClick={() => setShowPromptInput(true)}>Customize instructions →</span>}
                  </>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-6 p-6 bg-red-500/20 border-2 border-red-500/50 rounded-xl backdrop-blur-xl"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-300 font-bold text-lg mb-2">Scraping Failed</h3>
                  <p className="text-gray-200 mb-3">{error}</p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Common solutions:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Verify the URL is correct and accessible</li>
                      <li>Check if the website blocks automated access</li>
                      <li>Ensure the URL includes http:// or https://</li>
                      <li>Try again in a few moments</li>
                    </ul>
                  </div>
                </div>
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
              className="mt-8 space-y-6"
            >
              {/* Success Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-green-300 font-bold text-lg">
                        Scraping Completed Successfully!
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Extracted and analyzed {result.metadata.wordCount.toLocaleString()} words in {(result.metadata.scrapeDuration / 1000).toFixed(2)}s
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
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    New Scrape
                  </motion.button>
                </div>
              </motion.div>

              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">{result.title}</h2>
                <p className="text-gray-300 mb-6">{result.description}</p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Word Count</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.wordCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Images</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.imageCount}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Links</p>
                    <p className="text-2xl font-bold text-white">
                      {result.metadata.linkCount}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Duration</p>
                    <p className="text-2xl font-bold text-white">
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
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4">Content Preview</h3>
                <div className="bg-white/5 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {result.content.substring(0, 1000)}
                    {result.content.length > 1000 && '...'}
                  </p>
                </div>
              </motion.div>

              {/* AI Analysis - Nerd Mode Only */}
              {mode === 'nerd' && result.aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl p-8 border-2 border-purple-500/50"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Gemini AI Analysis</h3>
                      <p className="text-purple-300 text-sm">Deep content intelligence & insights</p>
                    </div>
                  </div>
                  <div className="bg-black/20 p-6 rounded-xl border border-purple-400/30">
                    <div className="prose prose-invert max-w-none">
                      <pre className="text-gray-200 whitespace-pre-wrap font-sans leading-relaxed text-base">
{result.aiAnalysis}
                      </pre>
                    </div>
                  </div>
                  {customPrompt && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-400 mb-1">Custom Instructions Used:</p>
                      <p className="text-sm text-purple-300">{customPrompt}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Extracted Data - Nerd Mode Only */}
              {mode === 'nerd' && result.extractedData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Extracted Data</h3>
                  
                  {/* Headings */}
                  {result.extractedData.headings?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">
                        Headings
                      </h4>
                      <div className="space-y-2">
                        {result.extractedData.headings.slice(0, 10).map((heading: string, i: number) => (
                          <div key={i} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-gray-300">{heading}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {result.extractedData.images?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">
                        Images ({result.extractedData.images.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.extractedData.images.slice(0, 6).map((img: any, i: number) => (
                          <div key={i} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Alt: {img.alt || 'N/A'}</p>
                            <p className="text-gray-300 text-xs truncate">{img.src}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
