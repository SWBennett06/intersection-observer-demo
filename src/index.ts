import runScrollDemo from './scrollDemo';
import runIODemo from './observerDemo';

const scrollTrigger = document.getElementById('triggerScrollDemo');
scrollTrigger.addEventListener('click', runScrollDemo);

const ioTrigger = document.getElementById('triggerIODemo');
ioTrigger.addEventListener('click', runIODemo);
