fetch("http://localhost:3001/api/health")
  .then(res => res.json())
  .then(console.log);