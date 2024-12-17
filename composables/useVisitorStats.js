export const useVisitorStats = () => {
  const { $supabase } = useNuxtApp();
  const loading = ref(false);
  const stats = ref({
    today: 0,
    thisMonth: 0,
    total: 0
  });

  const recordVisit = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const thisMonth = today.substring(0, 7);

      // Record the visit
      const { error } = await $supabase
        .from('visitor_stats')
        .insert([
          {
            visited_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      // Update stats after recording
      await fetchStats();
    } catch (error) {
      console.error('Error recording visit:', error);
    }
  };

  const fetchStats = async () => {
    try {
      loading.value = true;
      const today = new Date().toISOString().split('T')[0];
      const thisMonth = today.substring(0, 7);

      // Get today's visits
      const { data: todayData, error: todayError } = await $supabase
        .from('visitor_stats')
        .select('count', { count: 'exact' })
        .gte('visited_at', today);

      if (todayError) throw todayError;

      // Get this month's visits
      const { data: monthData, error: monthError } = await $supabase
        .from('visitor_stats')
        .select('count', { count: 'exact' })
        .gte('visited_at', `${thisMonth}-01`);

      if (monthError) throw monthError;

      // Get total visits
      const { data: totalData, error: totalError } = await $supabase
        .from('visitor_stats')
        .select('count', { count: 'exact' });

      if (totalError) throw totalError;

      stats.value = {
        today: todayData[0]?.count || 0,
        thisMonth: monthData[0]?.count || 0,
        total: totalData[0]?.count || 0
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    stats,
    loading,
    recordVisit,
    fetchStats
  };
};
