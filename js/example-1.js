(function() {
  let header = document.querySelector('.example-1 .header')
  let sidebar = document.querySelector('.example-1 .sidebar')
  header.addEventListener('click', function() {
    sidebar.classList.toggle('auto-height')
  })
}())
