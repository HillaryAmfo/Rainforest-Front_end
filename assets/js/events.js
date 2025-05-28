// Load the header
fetch('/Rainforest-Front_end/assets/components/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load the footer
fetch('/Rainforest-Front_end/assets/components//footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });
