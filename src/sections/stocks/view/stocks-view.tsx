// src/sections/stocks/view/stocks-view.tsx
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { stocksApi } from 'src/services/api';
import { StockPriceChart } from '../stocks-price-chart';

export function StocksView() {
  const theme = useTheme();
  const [stockData, setStockData] = useState<{ date: string; price: number; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await stocksApi.getStockData();
        setStockData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth="xl">
        <Alert severity="error">{error}</Alert>
      </DashboardContent>
    );
  }

  // Calcular el porcentaje de cambio
  const firstPrice = stockData[0]?.price || 0;
  const lastPrice = stockData[stockData.length - 1]?.price || 0;
  const changeValue = ((lastPrice - firstPrice) / firstPrice * 100);
  const percentageChange = changeValue.toFixed(2);
  const isPositiveChange = changeValue >= 0;

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        AAPL Stock Analysis 📈
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          <StockPriceChart
            title="AAPL Stock Price"
            subheader={`${isPositiveChange ? '+' : ''}${percentageChange}% than last year`}
            chart={{
              categories: stockData.map(item => {
                const date = new Date(item.date);
                return date.toLocaleString('default', { month: 'short' });
              }),
              series: [
                {
                  name: 'Stock Price',
                  data: stockData.map(item => item.price),
                },
                {
                  name: '20-Day MA',
                  data: stockData.map((_, index, array) => {
                    const slice = array.slice(Math.max(0, index - 19), index + 1);
                    return Number((slice.reduce((sum, item) => sum + item.price, 0) / slice.length).toFixed(2));
                  }),
                },
              ],
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}