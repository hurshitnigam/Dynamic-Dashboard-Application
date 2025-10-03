import { CHART_COLORS } from '../../utils/constants';

const DonutChart = ({ data, type }) => {
    if (type === 'cloudAccounts') {
        const total = data.connected + data.notConnected;
        const connectedPercent = (data.connected / total) * 100;

        return (
            <div className="flex items-center justify-between">
                <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke={CHART_COLORS.gray}
                            strokeWidth="16"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke={CHART_COLORS.blue}
                            strokeWidth="16"
                            strokeDasharray={`${connectedPercent * 2.51} ${(100 - connectedPercent) * 2.51}`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{data.connected}</span>
                    </div>
                </div>
                <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Connected ({data.connected})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm">Not Connected ({data.notConnected})</span>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'riskAssessment') {
        const total = data.failed + data.warning + data.notAvailable + data.passed;

        return (
            <div className="flex items-center justify-between">
                <div className="relative w-28 h-28">
                    <svg className="w-28 h-28 transform -rotate-90">
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            stroke={CHART_COLORS.gray}
                            strokeWidth="20"
                        />
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            stroke={CHART_COLORS.red}
                            strokeWidth="20"
                            strokeDasharray="75 226"
                        />
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            stroke={CHART_COLORS.amber}
                            strokeWidth="20"
                            strokeDasharray="50 251"
                            strokeDashoffset="-75"
                        />
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            stroke={CHART_COLORS.green}
                            strokeWidth="20"
                            strokeDasharray="101 200"
                            strokeDashoffset="-125"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{total}</span>
                    </div>
                </div>
                <div className="ml-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">Failed ({data.failed})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs">Warning ({data.warning})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-xs">Not available ({data.notAvailable})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs">Passed ({data.passed})</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default DonutChart;