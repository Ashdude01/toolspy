/**
 * Tool Template Component
 * Reusable template for tool-based applications
 */

class ToolTemplate {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'Tool Title',
            description: config.description || 'Tool description goes here',
            features: config.features || [],
            inputSection: config.inputSection || {},
            outputSection: config.outputSection || {},
            showPreview: config.showPreview !== false,
            customSections: config.customSections || [],
            className: config.className || '',
            ...config
        };
        
        this.data = {
            input: null,
            output: null,
            processing: false
        };
        
        this.callbacks = {
            onProcess: config.onProcess || this.defaultProcess.bind(this),
            onClear: config.onClear || this.defaultClear.bind(this),
            onCopy: config.onCopy || this.defaultCopy.bind(this),
            onDownload: config.onDownload || this.defaultDownload.bind(this),
            ...config.callbacks
        };
        
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const mainHTML = `
            <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${this.config.className}">
                ${this.renderIntroSection()}
                ${this.renderInputSection()}
                ${this.renderPreviewSection()}
                ${this.renderOutputSection()}
                ${this.renderCustomSections()}
            </main>
        `;

        // Insert main content after header or at beginning of body
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('afterend', mainHTML);
        } else {
            document.body.insertAdjacentHTML('afterbegin', mainHTML);
        }
    }

    renderIntroSection() {
        return `
            <section class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    ${this.config.title}
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    ${this.config.description}
                </p>
                ${this.renderFeatures()}
            </section>
        `;
    }

    renderFeatures() {
        if (!this.config.features || this.config.features.length === 0) {
            return '';
        }

        return `
            <div class="flex flex-wrap justify-center gap-4 mt-6">
                ${this.config.features.map(feature => `
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        ${feature}
                    </span>
                `).join('')}
            </div>
        `;
    }

    renderInputSection() {
        const inputConfig = this.config.inputSection;
        
        return `
            <section class="mb-8">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-6 sm:p-8">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            ${inputConfig.title || 'Input'}
                        </h3>
                        
                        ${this.renderInputControls()}
                        
                        <div class="mt-6 flex flex-col sm:flex-row gap-3">
                            <button 
                                id="processBtn"
                                class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                disabled
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                </svg>
                                <span id="processBtnText">${inputConfig.processButtonText || 'Process'}</span>
                            </button>
                            
                            <button 
                                id="clearBtn"
                                class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                <span>Clear & Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderInputControls() {
        const inputConfig = this.config.inputSection;
        
        // Default textarea input
        if (!inputConfig.type || inputConfig.type === 'textarea') {
            return `
                <div class="space-y-4">
                    <label for="inputText" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        ${inputConfig.label || 'Input Text'}
                    </label>
                    <textarea 
                        id="inputText"
                        rows="${inputConfig.rows || 6}"
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none custom-scrollbar"
                        placeholder="${inputConfig.placeholder || 'Enter your text here...'}"
                    ></textarea>
                    <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span id="inputStats"></span>
                        <span>Max ${inputConfig.maxLength || 'unlimited'}</span>
                    </div>
                </div>
            `;
        }
        
        // File input
        if (inputConfig.type === 'file') {
            return `
                <div 
                    id="dropZone"
                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer group"
                    role="button"
                    tabindex="0"
                >
                    <div class="space-y-4">
                        <div class="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300">
                            <svg class="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xl font-semibold text-gray-900 dark:text-white">
                                ${inputConfig.dragText || 'Drag and drop your file here'}
                            </p>
                            <p class="text-gray-500 dark:text-gray-400 mt-2">
                                or <span class="text-blue-600 dark:text-blue-400 font-medium">click to browse</span>
                            </p>
                            <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                ${inputConfig.acceptText || 'Supported formats: TXT, CSV, JSON'}
                            </p>
                        </div>
                    </div>
                    
                    <input 
                        type="file" 
                        id="fileInput" 
                        class="hidden" 
                        accept="${inputConfig.accept || '.txt,.csv,.json'}"
                    >
                </div>
            `;
        }
        
        // Custom input controls
        return inputConfig.customHTML || '';
    }

    renderPreviewSection() {
        if (!this.config.showPreview) return '';
        
        return `
            <section id="previewSection" class="hidden mb-8">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-6 sm:p-8">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
                        <div id="previewContent" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <!-- Preview content will be inserted here -->
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderOutputSection() {
        const outputConfig = this.config.outputSection;
        
        return `
            <section id="outputSection" class="hidden">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-6 sm:p-8">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                                ${outputConfig.title || 'Output'}
                            </h3>
                            <div class="flex items-center space-x-2">
                                <span id="outputStats" class="text-sm text-gray-500 dark:text-gray-400"></span>
                                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex flex-col sm:flex-row gap-3">
                                <button 
                                    id="copyBtn"
                                    class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                    disabled
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>Copy to Clipboard</span>
                                </button>
                                
                                <button 
                                    id="downloadBtn"
                                    class="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                    disabled
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <span>Download</span>
                                </button>
                            </div>
                            
                            <div class="relative">
                                <textarea 
                                    id="outputText" 
                                    class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm font-mono resize-none custom-scrollbar focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="${outputConfig.placeholder || 'Output will appear here...'}"
                                    readonly
                                ></textarea>
                                
                                <!-- Loading Overlay -->
                                <div id="processingOverlay" class="absolute inset-0 bg-white dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 rounded-lg flex items-center justify-center hidden">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p class="text-gray-600 dark:text-gray-300 font-medium">Processing...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCustomSections() {
        if (!this.config.customSections || this.config.customSections.length === 0) {
            return '';
        }

        return this.config.customSections.map(section => section.html || '').join('');
    }

    attachEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        // Input event listeners
        const inputText = document.getElementById('inputText');
        const fileInput = document.getElementById('fileInput');
        const dropZone = document.getElementById('dropZone');
        
        // Button event listeners
        const processBtn = document.getElementById('processBtn');
        const clearBtn = document.getElementById('clearBtn');
        const copyBtn = document.getElementById('copyBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        if (inputText) {
            inputText.addEventListener('input', (e) => this.handleInputChange(e));
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileInput(e));
        }

        if (dropZone) {
            this.setupDropZone(dropZone, fileInput);
        }

        if (processBtn) {
            processBtn.addEventListener('click', () => this.handleProcess());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.handleClear());
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.handleCopy());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.handleDownload());
        }
    }

    setupDropZone(dropZone, fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            if (!dropZone.contains(e.relatedTarget)) {
                dropZone.classList.remove('drag-over');
            }
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileInput({ target: { files } });
            }
        });
    }

    handleInputChange(e) {
        const value = e.target.value;
        this.data.input = value;
        
        // Update stats
        const stats = document.getElementById('inputStats');
        if (stats) {
            stats.textContent = `${value.length} characters`;
        }
        
        // Enable/disable process button
        const processBtn = document.getElementById('processBtn');
        if (processBtn) {
            processBtn.disabled = !value.trim();
        }
    }

    handleFileInput(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.data.input = e.target.result;
            
            // Update UI
            const inputText = document.getElementById('inputText');
            if (inputText) {
                inputText.value = this.data.input;
                this.handleInputChange({ target: { value: this.data.input } });
            }
            
            // Show preview if enabled
            if (this.config.showPreview) {
                this.showPreview(this.data.input);
            }
        };
        reader.readAsText(file);
    }

    showPreview(data) {
        const previewSection = document.getElementById('previewSection');
        const previewContent = document.getElementById('previewContent');
        
        if (previewSection && previewContent) {
            previewContent.innerHTML = `<pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${data.slice(0, 500)}${data.length > 500 ? '...' : ''}</pre>`;
            previewSection.classList.remove('hidden');
        }
    }

    async handleProcess() {
        if (!this.data.input) return;
        
        this.setProcessingState(true);
        
        try {
            const result = await this.callbacks.onProcess(this.data.input);
            this.data.output = result;
            this.displayOutput(result);
        } catch (error) {
            console.error('Processing error:', error);
            if (window.Toast) {
                window.Toast.error('Processing failed: ' + error.message);
            }
        } finally {
            this.setProcessingState(false);
        }
    }

    setProcessingState(processing) {
        this.data.processing = processing;
        
        const processBtn = document.getElementById('processBtn');
        const processingOverlay = document.getElementById('processingOverlay');
        
        if (processBtn) {
            processBtn.disabled = processing;
            if (processing) {
                processBtn.classList.add('opacity-75');
            } else {
                processBtn.classList.remove('opacity-75');
            }
        }
        
        if (processingOverlay) {
            if (processing) {
                processingOverlay.classList.remove('hidden');
            } else {
                processingOverlay.classList.add('hidden');
            }
        }
    }

    displayOutput(output) {
        const outputSection = document.getElementById('outputSection');
        const outputText = document.getElementById('outputText');
        const outputStats = document.getElementById('outputStats');
        const copyBtn = document.getElementById('copyBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        
        if (outputText) {
            outputText.value = output;
        }
        
        if (outputStats) {
            outputStats.textContent = `${output.length} characters`;
        }
        
        if (copyBtn) {
            copyBtn.disabled = false;
        }
        
        if (downloadBtn) {
            downloadBtn.disabled = false;
        }
        
        if (outputSection) {
            outputSection.classList.remove('hidden');
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    handleClear() {
        this.data.input = null;
        this.data.output = null;
        
        const inputText = document.getElementById('inputText');
        const fileInput = document.getElementById('fileInput');
        const outputText = document.getElementById('outputText');
        const previewSection = document.getElementById('previewSection');
        const outputSection = document.getElementById('outputSection');
        
        if (inputText) inputText.value = '';
        if (fileInput) fileInput.value = '';
        if (outputText) outputText.value = '';
        if (previewSection) previewSection.classList.add('hidden');
        if (outputSection) outputSection.classList.add('hidden');
        
        this.callbacks.onClear();
    }

    async handleCopy() {
        if (!this.data.output) return;
        
        try {
            await navigator.clipboard.writeText(this.data.output);
            if (window.Toast) {
                window.Toast.success('Copied to clipboard!');
            }
        } catch (error) {
            if (window.Toast) {
                window.Toast.error('Failed to copy to clipboard');
            }
        }
    }

    handleDownload() {
        if (!this.data.output) return;
        
        this.callbacks.onDownload(this.data.output);
    }

    // Default callback implementations
    async defaultProcess(input) {
        return input; // Echo input as output
    }

    defaultClear() {
        if (window.Toast) {
            window.Toast.success('Cleared successfully!');
        }
    }

    defaultDownload(output) {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `output-${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (window.Toast) {
            window.Toast.success('File downloaded successfully!');
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToolTemplate;
}

// Global export
window.ToolTemplate = ToolTemplate; 