// Simple script for blog functionality

document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for all buttons with class 'btn'
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.05)"
      this.style.transition = "transform 0.3s"
    })

    button.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Function to display current year in footer
  const footerYear = document.getElementById("year")
  if (footerYear) {
    const year = new Date().getFullYear()
    footerYear.textContent = year
  }

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }

  // Toggle dark/light mode
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    } else {
      localStorage.setItem("theme", "light")
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  })

  // Add active class to current page in navigation
  const currentLocation = window.location.pathname
  const navLinks = document.querySelectorAll("header nav ul li a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    if (currentLocation.includes(linkPath) && linkPath !== "/") {
      link.classList.add("active")
    } else if (currentLocation === "/" && linkPath === "index.html") {
      link.classList.add("active")
    }
  })

  // Animate posts on scroll
  const animateOnScroll = () => {
    const posts = document.querySelectorAll(".post")

    posts.forEach((post) => {
      const postPosition = post.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (postPosition < screenPosition) {
        post.style.opacity = "1"
        post.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for posts
  const posts = document.querySelectorAll(".post")
  posts.forEach((post, index) => {
    post.style.opacity = "0"
    post.style.transform = "translateY(20px)"
    post.style.transitionDelay = `${index * 0.1}s`
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})
