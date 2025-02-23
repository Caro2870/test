// src/sections/stocks/stocks-price-chart.tsx
import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function StockPriceChart({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartOptions = useChart({
    colors: chart.colors ?? [theme.palette.primary.main, theme.palette.info.main],
    
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: Array(12).fill(theme.palette.text.secondary),
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
      marker: {
        show: false,
      },
    },
    
    stroke: {
      width: [2, 2],
      curve: 'smooth',
      lineCap: 'round',
    },
    
    markers: {
      size: 2,
      strokeColors: theme.palette.background.paper,
      strokeWidth: 2,
      shape: 'circle',
    },
    
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        strokeWidth: 2,
        strokeColor: theme.palette.background.paper,
        shape: 'circle',
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
            },
          },
        },
      },
    ],
    
    plotOptions: {
      bar: {
        columnWidth: '28%',
        borderRadius: 4,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader}
        sx={{
          p: 3,
          pb: 0,
          '& .MuiCardHeader-title': {
            color: 'text.primary',
            typography: 'h6',
          },
          '& .MuiCardHeader-subheader': {
            color: 'text.secondary',
            typography: 'body2',
            mt: 0.5,
          },
        }}
      />

      <Chart
        dir="ltr"
        type="line"
        series={chart.series}
        options={chartOptions}
        height={364}
        sx={{
          p: 3,
          '& .apexcharts-canvas': {
            bgcolor: 'transparent',
          },
        }}
      />
    </Card>
  );
}