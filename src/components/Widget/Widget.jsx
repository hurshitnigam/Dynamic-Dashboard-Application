import { X } from 'lucide-react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import EmptyState from './EmptyState';
import { WIDGET_TYPES } from '../../utils/constants';

const Widget = ({ widget, onRemove }) => {
    const renderContent = () => {
        // Handle custom widgets
        if (widget.type === 'custom' || widget.isCustom) {
            return (
                <div className="text-sm text-gray-600 whitespace-pre-line">
                    {widget.text || 'No data available'}
                </div>
            );
        }

        // Handle predefined widget types
        switch (widget.type) {
            case WIDGET_TYPES.DONUT:
                // Use chartType if available, otherwise infer from name
                const chartType = widget.chartType ||
                    (widget.name.includes('Risk') ? 'riskAssessment' : 'cloudAccounts');
                return <DonutChart data={widget.data} type={chartType} />;

            case WIDGET_TYPES.BAR:
                return <BarChart data={widget.data} />;

            case WIDGET_TYPES.EMPTY:
                return <EmptyState />;

            default:
                return <EmptyState />;
        }
    };

    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 relative group">
            <button
                onClick={onRemove}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove widget"
            >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>

            <h3 className="font-semibold text-sm text-gray-900 mb-4">
                {widget.name}
            </h3>

            {widget.isCustom && (
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded mb-3">
                    Custom Widget
                </span>
            )}

            <div className="widget-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Widget;