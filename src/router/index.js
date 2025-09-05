import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        description: 'Welcome to SpindexGFX — portfolio, skills and projects.',
        keywords: 'portfolio, web development, design'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About',
        description: 'Learn more about me and my professional journey.',
        keywords: 'about, profile, career'
      }
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
      meta: {
        title: 'Skills',
        description: 'Frameworks, languages, and tools I use with context.',
        keywords: 'skills, vue, tailwind, javascript'
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: 'Projects',
        description: 'Selected projects with measurable outcomes and details.',
        keywords: 'projects, portfolio, showcase'
      }
    },
    {
      path: '/experience',
      name: 'experience',
      component: ExperienceView,
      meta: {
        title: 'Experience',
        description: 'Professional experience and milestones.',
        keywords: 'experience, work history, career'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact',
        description: 'Get in touch via email or social channels.',
        keywords: 'contact, email, connect'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Not Found',
        description: 'This page could not be found.',
        keywords: '404, not found'
      }
    }
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 0, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router
