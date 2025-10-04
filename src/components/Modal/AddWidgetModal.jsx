import { X } from 'lucide-react';
import { useState } from 'react';
import { TABS } from '../../utils/constants';

const AddWidgetModal = ({
    isOpen,
    onClose,
    activeTab,
    setActiveTab,
    availableWidgets,
    selectedWidgets,
    onToggleWidget,
    onConfirm,
    onAddCustomWidget
}) => {
    const [customWidgetName, setCustomWidgetName] = useState('');
    const [customWidgetText, setCustomWidgetText] = useState('');

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

    const handleAddCustomWidget = () => {
        if (customWidgetName.trim()) {
            onAddCustomWidget(customWidgetName, customWidgetText);
            setCustomWidgetName('');
            setCustomWidgetText('');
        }
    };

    const handleConfirm = () => {
        onConfirm();
        setCustomWidgetName('');
        setCustomWidgetText('');
    };

    const handleClose = () => {
        onClose();
        setCustomWidgetName('');
        setCustomWidgetText('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white rounded-t-lg sticky top-0 z-10">
                    <h2 className="text-sm font-medium">Add Widget</h2>
                    <button
                        onClick={handleClose}
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

                    {/* Add Custom Widget Form */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Add Custom Widget
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Widget Name *
                                </label>
                                <input
                                    type="text"
                                    value={customWidgetName}
                                    onChange={(e) => setCustomWidgetName(e.target.value)}
                                    placeholder="Enter widget name"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Widget Text
                                </label>
                                <textarea
                                    value={customWidgetText}
                                    onChange={(e) => setCustomWidgetText(e.target.value)}
                                    placeholder="Enter widget text (optional)"
                                    rows="3"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <button
                                onClick={handleAddCustomWidget}
                                disabled={!customWidgetName.trim()}
                                className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Add Widget
                            </button>
                        </div>
                    </div>

                    {/* Existing Widgets List */}
                    <div className="border-t pt-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Or Select from Available Widgets
                        </h3>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
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
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg border-t sticky bottom-0">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
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