// Enhanced admin script for post creation

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form")
  const preview = document.getElementById("preview")
  const previewContent = document.getElementById("preview-content")
  const previewBtn = document.getElementById("preview-btn")

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const title = document.getElementById("title").value
      const content = document.getElementById("content").value
      const imageUrl = document.getElementById("image").value || "/placeholder.svg?height=200&width=600"
      const tags = document.getElementById("tags").value
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Create preview
      preview.style.display = "block"
      previewContent.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="post-image">
        <h2>${title}</h2>
        <div class="meta">Posted on ${date}</div>
        ${renderTags(tags)}
        ${formatContent(content)}
        <div style="margin-top: 1rem;">
          <span class="btn">Read More</span>
        </div>
      `

      // Scroll to preview
      preview.scrollIntoView({ behavior: "smooth" })

      // In a real application, this would save the post to a database
      console.log("Post created:", { title, content, imageUrl, tags, date })
    })
  }

  // Preview button functionality
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      // Get form values
      const title = document.getElementById("title").value || "Post Title"
      const content = document.getElementById("content").value || "Post content preview..."
      const imageUrl = document.getElementById("image").value || "/placeholder.svg?height=200&width=600"
      const tags = document.getElementById("tags").value
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Create preview
      preview.style.display = "block"
      previewContent.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="post-image">
        <h2>${title}</h2>
        <div class="meta">Posted on ${date}</div>
        ${renderTags(tags)}
        ${formatContent(content)}
        <div style="margin-top: 1rem;">
          <span class="btn">Read More</span>
        </div>
      `

      // Scroll to preview
      preview.scrollIntoView({ behavior: "smooth" })
    })
  }

  // Helper function to format content (convert newlines to paragraphs)
  function formatContent(text) {
    if (!text.trim()) return "<p>No content provided.</p>"

    return text
      .split("\n\n")
      .filter((paragraph) => paragraph.trim() !== "")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("")
  }

  // Helper function to render tags
  function renderTags(tagsString) {
    if (!tagsString.trim()) return ""

    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    if (tagsArray.length === 0) return ""

    const tagsHtml = tagsArray.map((tag) => `<span class="post-tag">${tag}</span>`).join("")

    return `<div class="post-tags">${tagsHtml}</div>`
  }
})
