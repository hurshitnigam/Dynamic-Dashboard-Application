import { Plus } from 'lucide-react';
import Widget from '../Widget/Widget';

const CategorySection = ({ category, onRemoveWidget, onAddWidget }) => {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
                {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.widgets.map(widget => (
                    <Widget
                        key={widget.id}
                        widget={widget}
                        onRemove={() => onRemoveWidget(category.id, widget.id)}
                    />
                ))}

                <button
                    onClick={() => onAddWidget(category.id)}
                    className="bg-white rounded-lg p-5 border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center min-h-[180px]"
                >
                    <div className="text-center text-gray-400">
                        <Plus className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm">Add Widget</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CategorySection;