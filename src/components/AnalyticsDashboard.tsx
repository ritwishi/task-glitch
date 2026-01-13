import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { DerivedTask } from '@/types';
import {
  computeFunnel,
  computeThroughputByWeek,
  computeWeightedPipeline,
  computeForecast,
  computeVelocityByPriority,
} from '@/utils/logic';

interface Props {
  tasks: DerivedTask[];
}

export default function AnalyticsDashboard({ tasks }: Props) {
  //  Use DerivedTask directly (already has roi and priorityWeight)
  const funnel = computeFunnel(tasks);
  const weekly = computeThroughputByWeek(tasks);
  const weightedPipeline = computeWeightedPipeline(tasks);
  const forecast = computeForecast(weekly.map(w => ({ week: w.week, revenue: w.revenue })), 4);
  const velocity = computeVelocityByPriority(tasks);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Analytics
        </Typography>

        <Stack spacing={3}>
          {/* Funnel */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Funnel
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: funnel.todo, label: `Todo (${funnel.todo})` },
                    { id: 1, value: funnel.inProgress, label: `In Progress (${funnel.inProgress})` },
                    { id: 2, value: funnel.done, label: `Done (${funnel.done})` },
                  ],
                },
              ]}
              width={300}
              height={200}
              margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </Box>

          {/* Throughput */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Throughput (weekly completed)
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: weekly.map(w => w.week) }]}
              series={[{ data: weekly.map(w => w.count), color: '#22A699' }]}
              width={300}
              height={200}
              margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
            />
          </Box>

          {/* Weighted Pipeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Weighted Pipeline
            </Typography>
            <Typography variant="body2">
              ${weightedPipeline.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </Typography>
          </Box>

          {/* Forecast */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Forecast (next 4 weeks)
            </Typography>
            <LineChart
              xAxis={[{ scaleType: 'band', data: forecast.map(f => f.week) }]}
              series={[{ data: forecast.map(f => f.revenue), color: '#F59E0B' }]}
              width={300}
              height={200}
              margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
            />
          </Box>

          {/* Velocity */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Velocity by Priority (avg days)
            </Typography>
            <Stack spacing={1}>
              <Typography variant="caption">
                High: {velocity.High.avgDays.toFixed(1)} days avg
              </Typography>
              <Typography variant="caption">
                Medium: {velocity.Medium.avgDays.toFixed(1)} days avg
              </Typography>
              <Typography variant="caption">
                Low: {velocity.Low.avgDays.toFixed(1)} days avg
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
