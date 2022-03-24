import { createRouter, createWebHistory } from 'vue-router';

import RegisterView from '../views/register.vue';
import LoginView from '../views/login.vue';
import CalendarView from '../views/calendar.vue';
import MonthlyCalendar from '@/components/Calendar/MonthlyCalendar.vue';
import WeeklyCalendar from '@/components/Calendar/WeeklyCalendar.vue';
import DailyCalendar from '@/components/Calendar/DailyCalendar.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/login',
         name: 'login',
         component: LoginView,
      },
      {
         path: '/register',
         name: 'register',
         component: RegisterView,
      },
      {
         path: '/calendar',
         name: 'calendar',
         component: CalendarView,
         children: [
            {
               path: '',
               redirect: '/calendar/month',
            },
            {
               name: 'month',
               path: 'month',
               component: MonthlyCalendar,
            },
            {
               name: 'week',
               path: 'week',
               component: WeeklyCalendar,
            },
            {
               name: 'day',
               path: 'day',
               component: DailyCalendar,
            },
         ],
      },
   ],
});

export default router;
