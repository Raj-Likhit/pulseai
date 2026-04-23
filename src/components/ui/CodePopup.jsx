import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clipboard, Check, Code } from 'lucide-react';

const CodeSnippet = ({ title, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-snippet-container">
            <div className="code-snippet-header">
                <span className="code-snippet-title">{title}</span>
                <button className="copy-btn" onClick={handleCopy}>
                    {copied ? <Check size={14} /> : <Clipboard size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="code-block-wrapper">
                <pre><code>{code}</code></pre>
            </div>
        </div>
    );
};

const CodePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    const snippets = [
        { 
            title: 'ArrayList to Array', 
            code: 'import java.util.*;\n\nclass ArrayListToArray {\n    public static void main(String args[]) {\n        ArrayList<Integer> al = new ArrayList<Integer>();\n        al.add(1);\n        al.add(2);\n        al.add(3);\n        al.add(4);\n        System.out.println("Contents of al: " + al);\n\n        Integer ia[] = new Integer[al.size()];\n        ia = al.toArray(ia);\n\n        int sum = 0;\n        for (int i : ia) sum += i;\n        System.out.println("Sum is: " + sum);\n    }\n}' 
        },
        { 
            title: 'SortString Demo', 
            code: 'import java.util.Arrays;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class SortStringDemo {\n    public static void sortString() {\n        List<String> colors = Arrays.asList("Red", "Green", "Blue", "Pink", "Brown");\n        System.out.println("Original list: " + colors);\n        \n        Collections.sort(colors);\n        System.out.println("Sorted Array in ascending order: " + colors);\n        \n        Collections.sort(colors, Collections.reverseOrder());\n        System.out.println("Sorted Array in descending order: " + colors);\n    }\n    \n    public static void main(String args[]) {\n        sortString();\n    }\n}' 
        },
        { 
            title: 'ArrayList Demo', 
            code: 'import java.util.*;\n\nclass ArrayListDemo {\n    public static void main(String args[]) {\n        ArrayList<Integer> al = new ArrayList<Integer>();\n        System.out.println("Initial size of al: " + al.size());\n\n        al.add(1);\n        al.add(2);\n        al.add(3);\n        al.add(4);\n        al.add(1, 10);\n        al.add(2, 20);\n\n        System.out.println("Size after additions: " + al.size());\n        System.out.println("Contents of al: " + al);\n\n        al.remove(Integer.valueOf(4));\n        al.remove(2);\n\n        System.out.println("Size after deletions: " + al.size());\n        System.out.println("Contents of al: " + al);\n    }\n}' 
        },
        { 
            title: 'File Info', 
            code: 'import java.io.File;\nimport java.util.Scanner;\n\npublic class FileInfo {\n    public static void checkFile() {\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Enter the file name with path: ");\n        String fileName = sc.nextLine();\n        File file = new File(fileName);\n\n        if (file.exists()) {\n            System.out.println("File exists: Yes");\n            System.out.println("Readable: " + (file.canRead() ? "Yes" : "No"));\n            System.out.println("Writeable: " + (file.canWrite() ? "Yes" : "No"));\n            String fileType = fileName.contains(".")\n                ? fileName.substring(fileName.lastIndexOf(".") + 1)\n                : "Unknown";\n            System.out.println("File type: " + fileType);\n            System.out.println("File length (bytes): " + file.length());\n        } else {\n            System.out.println("File does not exist");\n        }\n        sc.close();\n    }\n\n    public static void main(String args[]) {\n        checkFile();\n    }\n}' 
        },
        { 
            title: 'Iterator Demo', 
            code: 'import java.util.ArrayList;\nimport java.util.Iterator;\n\nclass IteratorDemo {\n    ArrayList<String> list;\n\n    public IteratorDemo() {\n        list = new ArrayList<>();\n    }\n\n    public void addElements() {\n        list.add("A");\n        list.add("B");\n        list.add("C");\n        list.add("D");\n        list.add("E");\n        list.add("F");\n    }\n\n    public void displayElements() {\n        Iterator<String> iterator = list.iterator();\n        System.out.println("Elements in the array list: ");\n        while (iterator.hasNext()) {\n            System.out.println(iterator.next());\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        IteratorDemo demo = new IteratorDemo();\n        demo.addElements();\n        demo.displayElements();\n    }\n}' 
        },
        { 
            title: 'Tree Set', 
            code: 'import java.util.TreeSet;\n\npublic class TreeSetDemo {\n    public static void main(String[] args) {\n        TreeSet<Integer> treeset = new TreeSet<>();\n        treeset.add(12);\n        treeset.add(23);\n        treeset.add(56);\n        treeset.add(65);\n        treeset.add(34);\n        treeset.add(44);\n        \n        System.out.println("Tree set elements: " + treeset);\n        \n        int testvalue = 50;\n        Integer result = treeset.floor(testvalue);\n        \n        if (result != null) {\n            System.out.println("Element less than or equal to " + testvalue + ": " + result);\n        } else {\n            System.out.println("No elements less than or equal to " + testvalue + " found");\n        }\n    }\n}' 
        },
    ];

    return (
        <>
            <motion.button
                className="code-popup-trigger"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open code reference"
            >
                <Code size={18} />
                <span>Click me</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="code-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="code-modal"
                            initial={{ y: 50, opacity: 0, scale: 0.92 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.92 }}
                            onClick={(e) => e.stopPropagation()}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        >
                            <div className="code-modal-header">
                                <h2 className="display-md">Code</h2>
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="code-modal-content">
                                {snippets.map((snippet, index) => (
                                    <CodeSnippet key={index} {...snippet} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CodePopup;
