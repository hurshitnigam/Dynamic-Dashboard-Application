const BarChart = ({ data }) => {
    const criticalPercent = (data.critical / data.total) * 100;
    const highPercent = (data.high / data.total) * 100;

    return (
        <div className="space-y-3">
            <div className="text-xl font-bold">{data.total}</div>
            <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden flex">
                    <div
                        className="bg-red-500 h-full"
                        style={{ width: `${criticalPercent}%` }}
                    ></div>
                    <div
                        className="bg-orange-400 h-full"
                        style={{ width: `${highPercent}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span>Critical ({data.critical})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-orange-400"></div>
                    <span>High ({data.high})</span>
                </div>
            </div>
        </div>
    );
};

export default BarChart;