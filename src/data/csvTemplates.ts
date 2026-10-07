export const SAMPLE_METRICS_CSV = `Date,Platform,Followers,Reach,Impressions,Engagement,Likes,Comments,Shares,Saves,VideoViews
2026-10-01,Instagram,520000,42000,68000,4200,3100,450,420,230,28000
2026-10-01,YouTube,380000,31000,52000,3900,2800,710,290,100,45000
2026-10-01,LinkedIn,140000,14000,22000,1600,1100,240,190,70,6000
2026-10-01,Twitter,166000,26000,44000,1950,1300,310,300,40,10000
2026-10-01,Facebook,214000,20500,31000,1400,980,180,200,40,9500
2026-10-02,Instagram,520800,45000,74000,4600,3400,490,460,250,31000
2026-10-02,YouTube,380400,33500,56000,4100,2950,730,320,100,48000
2026-10-02,LinkedIn,140400,15200,24500,1750,1200,270,210,70,6800
2026-10-02,Twitter,166400,28000,47000,2100,1400,340,310,50,11000
2026-10-02,Facebook,214300,21800,33000,1520,1050,200,220,50,10200
2026-10-03,Instagram,521500,49000,81000,5200,3800,540,560,300,35000
2026-10-03,YouTube,380900,36000,60000,4500,3200,810,380,110,52000
2026-10-03,LinkedIn,140900,16800,27000,1900,1320,290,220,70,7500
2026-10-03,Twitter,166900,31000,51000,2300,1550,380,320,50,12500
2026-10-03,Facebook,214600,23000,35000,1610,1120,210,230,50,11000`;

export const SAMPLE_POSTS_CSV = `PostId,Platform,Caption,Format,PublishedAt,Reach,Impressions,Likes,Comments,Shares,Saves
P101,Instagram,"Swipe through for 7 productivity prompts for dev teams 🚀 #AI #Workflow",carousel,2026-10-05,92000,154000,8400,920,1850,720
P102,YouTube,"Building Scalable Microservices with Event Streams - Architecture Deep Dive",video,2026-10-04,180000,340000,14200,2600,2100,680
P103,LinkedIn,"Why developer experience is the highest leverage investment in 2027",article,2026-10-03,45000,78000,3400,680,740,240
P104,Twitter,"Speed is the only moat that compounds. Here is how we ship weekly 🧵",text,2026-10-02,68000,132000,4500,1100,1200,190
P105,Facebook,"Meet our newest open-source fellows building privacy-first AI tools!",image,2026-10-01,38000,58000,2100,410,430,60`;

export function downloadSampleCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
