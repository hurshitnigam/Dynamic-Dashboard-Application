import { Plus, RefreshCw, Clock, ChevronDown, Search } from 'lucide-react';

const Header = ({ onAddWidget, onRefresh, searchTerm, onSearchChange }) => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900">CNAPP Dashboard</h1>

                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search widgets..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                        />
                    </div>

                    <button
                        onClick={onAddWidget}
                        className="px-4 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 flex items-center gap-2"
                    >
                        Add Widget <Plus className="h-4 w-4" />
                    </button>

                    <button
                        onClick={onRefresh}
                        className="p-1.5 hover:bg-gray-100 rounded"
                        title="Refresh Dashboard"
                    >
                        <RefreshCw className="h-4 w-4 text-gray-600" />
                    </button>

                    <button
                        className="p-1.5 hover:bg-gray-100 rounded"
                        title="Time Settings"
                    >
                        <Clock className="h-4 w-4 text-gray-600" />
                    </button>

                    <button className="px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded flex items-center gap-1">
                        Last 2 days <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;