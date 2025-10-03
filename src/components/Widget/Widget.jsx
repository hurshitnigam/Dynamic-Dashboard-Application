import { X } from 'lucide-react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import EmptyState from './EmptyState';
import { WIDGET_TYPES } from '../../utils/constants';

const Widget = ({ widget, onRemove }) => {
    const renderContent = () => {
        switch (widget.type) {
            case WIDGET_TYPES.DONUT:
                if (widget.name === 'Cloud Accounts') {
                    return <DonutChart data={widget.data} type="cloudAccounts" />;
                }
                if (widget.name === 'Cloud Account Risk Assessment') {
                    return <DonutChart data={widget.data} type="riskAssessment" />;
                }
                return null;

            case WIDGET_TYPES.BAR:
                return <BarChart data={widget.data} />;

            case WIDGET_TYPES.EMPTY:
                return <EmptyState />;

            default:
                return null;
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

            <div className="widget-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Widget;