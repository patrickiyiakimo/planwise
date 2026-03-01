"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calculator, 
  History, 
  BookOpen, 
  Sparkles,
  Menu,
  X,
  Download,
  Share2,
  Copy
} from 'lucide-react';
import ProblemInput from '@/app/(website)/components/maths-solver/ProblemInput';
import SolutionDisplay from '@/app/(website)/components/maths-solver/SolutionDisplay';
import StepByStep from '@/app/(website)/components/maths-solver/StepByStep';
import GraphVisualization from '@/app/(website)/components/maths-solver/GraphVisualization';
import HistorySidebar from '@/app/(website)/components/maths-solver/HistorySidebar';
import MathKeyboard from '@/app/(website)/components/maths-solver/MathKeyboard';
import TopicSelector from '@/app/(website)/components/maths-solver/TopicSelector';

const MathsSolverContainer = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('algebra');
  const [history, setHistory] = useState([]);
  const [savedSolutions, setSavedSolutions] = useState([]);
  const [activeTab, setActiveTab] = useState('solution'); // 'solution', 'steps', 'graph'

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('mathsSolverHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const topics = [
    { id: 'algebra', label: 'Algebra', icon: '🔢', color: 'blue' },
    { id: 'calculus', label: 'Calculus', icon: '📈', color: 'green' },
    { id: 'trigonometry', label: 'Trigonometry', icon: '📐', color: 'purple' },
    { id: 'geometry', label: 'Geometry', icon: '🔷', color: 'yellow' },
    { id: 'statistics', label: 'Statistics', icon: '📊', color: 'red' },
    { id: 'linear-algebra', label: 'Linear Algebra', icon: '🧮', color: 'indigo' }
  ];

  const handleSolve = useCallback(async () => {
    if (!problem.trim()) return;

    setLoading(true);
    setActiveTab('solution');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock solution based on problem type
    let mockSolution = {};
    
    if (problem.includes('x^2') || problem.includes('x²') || problem.includes('quadratic')) {
      mockSolution = {
        type: 'quadratic',
        problem: problem,
        solution: 'x = 2 or x = -3',
        steps: [
          { step: 1, description: 'Identify the quadratic equation: x² + x - 6 = 0', formula: 'ax² + bx + c = 0' },
          { step: 2, description: 'Identify coefficients: a = 1, b = 1, c = -6', formula: 'a = 1, b = 1, c = -6' },
          { step: 3, description: 'Apply the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a', formula: 'x = [-1 ± √(1² - 4(1)(-6))] / 2(1)' },
          { step: 4, description: 'Simplify under the square root: 1 + 24 = 25', formula: '√25 = 5' },
          { step: 5, description: 'Calculate both solutions: x = (-1 + 5)/2 = 2, x = (-1 - 5)/2 = -3', formula: 'x = 2, x = -3' }
        ],
        graph: {
          type: 'parabola',
          equation: 'y = x² + x - 6',
          points: [
            { x: -4, y: 6 },
            { x: -3, y: 0 },
            { x: -2, y: -4 },
            { x: -1, y: -6 },
            { x: 0, y: -6 },
            { x: 1, y: -4 },
            { x: 2, y: 0 },
            { x: 3, y: 6 },
            { x: 4, y: 14 }
          ],
          roots: [-3, 2],
          vertex: { x: -0.5, y: -6.25 }
        },
        relatedFormulas: [
          'Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a',
          'Discriminant: Δ = b² - 4ac',
          'Vertex Formula: x = -b/(2a)'
        ],
        practiceProblems: [
          'x² + 5x + 6 = 0',
          '2x² - 4x - 6 = 0',
          'x² - 9 = 0'
        ]
      };
    } else if (problem.includes('derivative') || problem.includes('differentiate') || problem.includes('dy/dx')) {
      mockSolution = {
        type: 'calculus',
        problem: problem,
        solution: 'dy/dx = 3x² + 2x',
        steps: [
          { step: 1, description: 'Identify the function: f(x) = x³ + x²', formula: 'f(x) = x³ + x²' },
          { step: 2, description: 'Apply power rule: d/dx[xⁿ] = n·xⁿ⁻¹', formula: 'd/dx[x³] = 3x²' },
          { step: 3, description: 'Apply power rule to second term: d/dx[x²] = 2x', formula: 'd/dx[x²] = 2x' },
          { step: 4, description: 'Combine the derivatives', formula: 'f\'(x) = 3x² + 2x' }
        ],
        graph: {
          type: 'function',
          equation: 'y = x³ + x²',
          derivative: 'y\' = 3x² + 2x',
          points: [
            { x: -2, y: -4 },
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 12 }
          ]
        }
      };
    } else if (problem.includes('integral') || problem.includes('∫') || problem.includes('integrate')) {
      mockSolution = {
        type: 'calculus',
        problem: problem,
        solution: '∫(2x + 3) dx = x² + 3x + C',
        steps: [
          { step: 1, description: 'Identify the integrand: 2x + 3', formula: '∫(2x + 3) dx' },
          { step: 2, description: 'Apply power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1)', formula: '∫2x dx = x²' },
          { step: 3, description: 'Integrate the constant: ∫3 dx = 3x', formula: '∫3 dx = 3x' },
          { step: 4, description: 'Combine terms and add constant', formula: 'x² + 3x + C' }
        ]
      };
    } else if (problem.includes('matrix') || problem.includes('determinant')) {
      mockSolution = {
        type: 'linear-algebra',
        problem: problem,
        solution: 'det(A) = -2',
        steps: [
          { step: 1, description: 'Given matrix A = [[1, 2], [3, 4]]', formula: 'A = [1 2; 3 4]' },
          { step: 2, description: 'Apply determinant formula: det = ad - bc', formula: 'det = (1)(4) - (2)(3)' },
          { step: 3, description: 'Calculate: 4 - 6 = -2', formula: 'det(A) = -2' }
        ]
      };
    } else {
      mockSolution = {
        type: 'general',
        problem: problem,
        solution: 'x = 4',
        steps: [
          { step: 1, description: 'Original equation: 2x + 5 = 13', formula: '2x + 5 = 13' },
          { step: 2, description: 'Subtract 5 from both sides: 2x = 8', formula: '2x = 8' },
          { step: 3, description: 'Divide both sides by 2: x = 4', formula: 'x = 4' }
        ]
      };
    }

    setSolution(mockSolution);

    // Add to history
    const newHistoryItem = {
      id: Date.now(),
      problem: problem,
      solution: mockSolution.solution,
      timestamp: new Date().toISOString(),
      topic: selectedTopic
    };

    const updatedHistory = [newHistoryItem, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem('mathsSolverHistory', JSON.stringify(updatedHistory));

    setLoading(false);
  }, [problem, history, selectedTopic]);

  const handleClear = () => {
    setProblem('');
    setSolution(null);
    setActiveTab('solution');
  };

  const handleHistorySelect = (item) => {
    setProblem(item.problem);
    // Trigger solve automatically
    setTimeout(() => handleSolve(), 100);
    setShowHistory(false);
  };

  const handleSaveSolution = () => {
    if (solution) {
      setSavedSolutions(prev => [...prev, { ...solution, savedAt: new Date().toISOString() }]);
    }
  };

  const handleCopySolution = () => {
    if (solution) {
      navigator.clipboard.writeText(solution.solution);
    }
  };

  const handleDownloadSolution = () => {
    if (solution) {
      const content = `
Problem: ${solution.problem}
Solution: ${solution.solution}

Step-by-Step Solution:
${solution.steps.map(step => `${step.step}. ${step.description}\n   ${step.formula}`).join('\n\n')}

Generated by Planwise AI Math Solver
${new Date().toLocaleString()}
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `math-solution-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const insertMathSymbol = (symbol) => {
    setProblem(prev => prev + symbol);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">AI Math Solver</h1>
                  <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full">
                    BETA
                  </span>
                </div>
                <p className="text-sm text-gray-500">Solve any math problem with step-by-step explanations</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <History className="w-5 h-5" />
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    {history.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowKeyboard(!showKeyboard)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
              >
                {showKeyboard ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* History Sidebar */}
        <HistorySidebar
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={history}
          onSelect={handleHistorySelect}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Topic Selector */}
            <TopicSelector
              topics={topics}
              selectedTopic={selectedTopic}
              onSelect={setSelectedTopic}
            />

            {/* Problem Input */}
            <ProblemInput
              problem={problem}
              setProblem={setProblem}
              onSolve={handleSolve}
              onClear={handleClear}
              loading={loading}
            />

            {/* Math Keyboard (Mobile) */}
            {showKeyboard && (
              <MathKeyboard
                onInsert={insertMathSymbol}
                onClose={() => setShowKeyboard(false)}
              />
            )}

            {/* Solution Display */}
            {solution && !loading && (
              <div className="mt-6">
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mb-4">
                  <button
                    onClick={handleCopySolution}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy solution"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveSolution}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Save solution"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDownloadSolution}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download solution"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Share solution"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setActiveTab('solution')}
                      className={`py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'solution'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Solution
                    </button>
                    <button
                      onClick={() => setActiveTab('steps')}
                      className={`py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'steps'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Step-by-Step
                    </button>
                    {solution.graph && (
                      <button
                        onClick={() => setActiveTab('graph')}
                        className={`py-2 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === 'graph'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Graph
                      </button>
                    )}
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'solution' && (
                  <SolutionDisplay solution={solution} />
                )}

                {activeTab === 'steps' && (
                  <StepByStep steps={solution.steps} />
                )}

                {activeTab === 'graph' && solution.graph && (
                  <GraphVisualization graph={solution.graph} />
                )}

                {/* Related Content */}
                {solution.relatedFormulas && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                    <h3 className="text-sm font-medium text-indigo-900 mb-2">Related Formulas</h3>
                    <div className="space-y-2">
                      {solution.relatedFormulas.map((formula, index) => (
                        <p key={index} className="text-sm text-indigo-700 font-mono">{formula}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practice Problems */}
                {solution.practiceProblems && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Practice Problems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {solution.practiceProblems.map((problem, index) => (
                        <button
                          key={index}
                          onClick={() => setProblem(problem)}
                          className="p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all text-left"
                        >
                          <span className="text-sm font-mono text-gray-700">{problem}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-12 text-center">
                <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Solving your problem...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!solution && !loading && (
              <div className="mt-12 text-center">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-sm max-w-md">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to solve</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Enter a math problem above and I'll provide a step-by-step solution
                  </p>
                  <div className="space-y-2 text-left">
                    <p className="text-xs text-gray-400">Examples:</p>
                    <button
                      onClick={() => setProblem('Solve quadratic equation: x² + x - 6 = 0')}
                      className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      • x² + x - 6 = 0
                    </button>
                    <button
                      onClick={() => setProblem('Find the derivative of x³ + x²')}
                      className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      • Find derivative of x³ + x²
                    </button>
                    <button
                      onClick={() => setProblem('Calculate the integral of 2x + 3')}
                      className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      • ∫(2x + 3) dx
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathsSolverContainer;