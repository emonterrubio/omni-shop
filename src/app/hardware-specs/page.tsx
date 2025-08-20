"use client";

import { PageLayout } from '@/components/layout/PageLayout';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Info, Cpu, Gpu, MemoryStick, HardDrive, Zap, Settings, Search, BarChart3, Microchip } from 'lucide-react';

export default function HardwareSpecsPage() {
  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Find Hardware", href: "/find-hardware" },
          { label: "About Hardware Specifications", isActive: true }
        ]}
        className="mb-6"
      />

      {/* Main Content */}
      <div>
        {/* Page Header */}
        <div className="text-left mb-4 lg:mb-6">
          <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-4">
            About Hardware Specifications
          </h1>
          <p className="text-base font-regular text-gray-800 mb-2">
            Hardware specifications refer to the technical details of a computer's physical components, 
            including the processor, memory, storage, graphics card, and more. Understanding these 
            specifications is crucial for assessing a computer's capabilities and performance.
          </p>
        </div>

        {/* Key Components Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-2xl lg:text-3xl font-regular text-gray-900 mb-6 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-blue-600" />
            Key Hardware Components and Specifications
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Processor */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <Cpu className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Processor (CPU)</h3>
              </div>
              <p className="text-gray-700 mb-1">
                The "brain" responsible for processing instructions and performing calculations.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> Model, cores, clock speed (GHz), cache size
              </div>
            </div>

            {/* Memory */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <MemoryStick className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Memory (RAM)</h3>
              </div>
              <p className="text-gray-700 mb-1">
                Temporary storage for active data and running programs.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> Amount (GB), speed (MHz), type (DDR4/DDR5)
              </div>
            </div>

            {/* Storage */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <HardDrive className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Storage</h3>
              </div>
              <p className="text-gray-700 mb-1">
                Permanent storage for files, programs, and operating system.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> Type (HDD/SSD), capacity (GB/TB), read/write speeds
              </div>
            </div>

            {/* Graphics Card */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <Gpu className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Graphics Card (GPU)</h3>
              </div>
              <p className="text-gray-700 mb-1">
                Handles visual output, especially for gaming and graphic design.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> GPU model, VRAM, clock speed, memory bandwidth
              </div>
            </div>

            {/* Motherboard */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <Microchip className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Motherboard</h3>
              </div>
              <p className="text-gray-700 mb-1">
                The main circuit board that connects all other components together.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> Socket type, chipset, expansion slots, connectivity
              </div>
            </div>

            {/* Power Supply */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <Zap className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Power Supply Unit (PSU)</h3>
              </div>
              <p className="text-gray-700 mb-1">
                Provides stable power to all components in the system.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Key specs:</strong> Wattage, efficiency rating, modular design
              </div>
            </div>
          </div>
        </div>

        {/* How to Find Specs Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-2xl lg:text-3xl font-regular text-gray-900 mb-6 flex items-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            How to Find Your Computer's Specifications
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Windows */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Windows
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Settings:</strong> Go to Settings &gt; System &gt; About to find basic 
                    information like processor, RAM, and Windows version.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>System Information:</strong> Search for "System Information" in the 
                    Windows search bar. This provides detailed information about hardware and software.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Task Manager:</strong> Press Ctrl+Shift+Esc, then go to the Performance 
                    tab to see CPU, RAM, and GPU usage.
                  </div>
                </li>
              </ul>
            </div>

            {/* macOS */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                macOS
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>About This Mac:</strong> Click the Apple icon &gt; About This Mac to see 
                    basic system information.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>System Report:</strong> Click System Report... to see more detailed 
                    hardware information.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Specs Matter Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-2xl lg:text-3xl font-regular text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Why Knowing Your Specs Matters
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Troubleshooting:</strong> Identify potential bottlenecks or issues with your hardware.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Upgrading:</strong> Determine if your system can handle new software or games.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Building/Buying:</strong> Make informed decisions when purchasing or building a new computer.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Compatibility:</strong> Ensure that new components are compatible with your existing system.
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-gray-700">
              <strong>For example:</strong> Knowing your CPU speed and RAM capacity helps you understand 
              if your computer can run a specific game or software application. Similarly, knowing the 
              type and capacity of your storage drive helps you determine how much space you have for 
              files and programs.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mt-8">
          <div className="text-2xl text-center font-medium mb-1">
            Ready to Find the Right Hardware?
          </div>
          <div className="mb-3 text-gray-600 text-base text-center">
            Now that you understand hardware specifications, use our filtering system 
            to find the perfect device for your needs.
          </div>
          <a
            href="/find-hardware"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Hardware
          </a>
        </div>
      </div>
    </PageLayout>
  );
}