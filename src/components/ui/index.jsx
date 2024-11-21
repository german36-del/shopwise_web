'use client'

import React from 'react'

export const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`} {...props}>
    {children}
  </button>
)

export const Input = ({ className, ...props }) => (
  <input className={`border border-gray-300 rounded px-3 py-2 ${className}`} {...props} />
)

export const Textarea = ({ className, ...props }) => (
  <textarea className={`border border-gray-300 rounded px-3 py-2 ${className}`} {...props} />
)

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
)

export const CardHeader = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 border-b ${className}`} {...props}>
    {children}
  </div>
)

export const CardContent = ({ children, className, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h2>
)

export const Tabs = ({ children, className, ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

export const TabsList = ({ children, className, ...props }) => (
  <div className={`flex ${className}`} {...props}>
    {children}
  </div>
)

export const TabsTrigger = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 ${className}`} {...props}>
    {children}
  </button>
)

export const TabsContent = ({ children, className, ...props }) => (
  <div className={`mt-4 ${className}`} {...props}>
    {children}
  </div>
)