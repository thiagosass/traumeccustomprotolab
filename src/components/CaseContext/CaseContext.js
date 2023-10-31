export function setCaseId(id) {
  localStorage.setItem('idcaso', id);
}

export function getCaseId() {
  return localStorage.getItem('idcaso');
}