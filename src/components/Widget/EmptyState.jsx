const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">No Graph data available!</p>
        </div>
    );
};

export default EmptyState;