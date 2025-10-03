import { X } from 'lucide-react';
import { TABS } from '../../utils/constants';

const AddWidgetModal = ({
    isOpen,
    onClose,
    activeTab,
    setActiveTab,
    availableWidgets,
    selectedWidgets,
    onToggleWidget,
    onConfirm
}) => {
    if (!isOpen) return null;

    const getCurrentWidgets = () => {
        switch (activeTab) {
            case TABS.CSPM:
                return availableWidgets.cspm || [];
            case TABS.CWPP:
                return availableWidgets.cwpp || [];
            case TABS.IMAGE:
                return availableWidgets.registry || [];
            default:
                return [];
        }
    };

    const currentWidgets = getCurrentWidgets();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-xl">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white rounded-t-lg">
                    <h2 className="text-sm font-medium">Add Widget</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Personalise your dashboard by adding the following widget
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-gray-200 mb-6">
                        {Object.values(TABS).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Widget List */}
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                        {currentWidgets.length > 0 ? (
                            currentWidgets.map(widget => (
                                <label
                                    key={widget.id}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedWidgets[widget.id] || false}
                                        onChange={() => onToggleWidget(widget.id)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{widget.name}</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-8">
                                No widgets available
                            </p>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 text-sm bg-blue-900 text-white rounded hover:bg-blue-800"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddWidgetModal;