export async function fetchDashboardCounts() {
  const response = await fetch('/api/dashboard/counts');
  if (!response.ok) {
    throw new Error('Error al obtener los conteos del dashboard');
  }
  return response.json();
} 