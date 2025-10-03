import { Plus, RefreshCw, Clock, ChevronDown } from 'lucide-react';

const Header = ({ onAddWidget, onRefresh }) => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900">CNAPP Dashboard</h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onAddWidget}
                        className="px-4 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 flex items-center gap-2"
                    >
                        Add Widget <Plus className="h-4 w-4" />
                    </button>

                    <button
                        onClick={onRefresh}
                        className="p-1.5 hover:bg-gray-100 rounded"
                    >
                        <RefreshCw className="h-4 w-4 text-gray-600" />
                    </button>

                    <button className="p-1.5 hover:bg-gray-100 rounded">
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