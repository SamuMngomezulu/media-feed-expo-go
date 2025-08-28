export type Post = {
  id: string;
  title: string;
  supplier: string;
  amountZar: number;
  thumbnailUrl: string;
  imageUrl: string;
  dueAt?: string; // ISO datetime; if within 24h, show "Remind me"
};

export const ALL_POSTS: Post[] = [
  {
    id: "1",
    title: "Cloud Services Retainer",
    supplier: "Thrive Business Solutions",
    amountZar: 12500.5,
    thumbnailUrl: "https://picsum.photos/id/1015/200/120",
    imageUrl: "https://picsum.photos/id/1015/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() // +2h
  },
  {
    id: "2",
    title: "Recruitment Fees",
    supplier: "Connect HR",
    amountZar: 8900,
    thumbnailUrl: "https://picsum.photos/id/1025/200/120",
    imageUrl: "https://picsum.photos/id/1025/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString() // +26h (no button)
  },
  {
    id: "3",
    title: "Engineering Bootcamp",
    supplier: "Dev Science",
    amountZar: 15200,
    thumbnailUrl: "https://picsum.photos/id/1035/200/120",
    imageUrl: "https://picsum.photos/id/1035/1200/720",
  },
  {
    id: "4",
    title: "Marketing Campaign",
    supplier: "Creative Spark",
    amountZar: 5500.75,
    thumbnailUrl: "https://picsum.photos/id/1045/200/120",
    imageUrl: "https://picsum.photos/id/1045/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString() // +12h
  },
  {
    id: "5",
    title: "Office Supplies",
    supplier: "Swift Office",
    amountZar: 850,
    thumbnailUrl: "https://picsum.photos/id/1055/200/120",
    imageUrl: "https://picsum.photos/id/1055/1200/720",
  },
  {
    id: "6",
    title: "Legal Consultation",
    supplier: "LexCorp Attorneys",
    amountZar: 21000,
    thumbnailUrl: "https://picsum.photos/id/1065/200/120",
    imageUrl: "https://picsum.photos/id/1065/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString() // +20h
  },
  {
    id: "7",
    title: "Server Maintenance",
    supplier: "TechOps Solutions",
    amountZar: 7300,
    thumbnailUrl: "https://picsum.photos/id/1075/200/120",
    imageUrl: "https://picsum.photos/id/1075/1200/720",
  },
  {
    id: "8",
    title: "UX/UI Design",
    supplier: "Pixel Perfect",
    amountZar: 11000,
    thumbnailUrl: "https://picsum.photos/id/1085/200/120",
    imageUrl: "https://picsum.photos/id/1085/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString() // +5h
  },
  {
    id: "9",
    title: "Company Retreat",
    supplier: "Adventure Tours",
    amountZar: 35000,
    thumbnailUrl: "https://picsum.photos/id/1095/200/120",
    imageUrl: "https://picsum.photos/id/1095/1200/720",
  },
  {
    id: "10",
    title: "Financial Audit",
    supplier: "Global Finance",
    amountZar: 18000,
    thumbnailUrl: "https://picsum.photos/id/1100/200/120",
    imageUrl: "https://picsum.photos/id/1100/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 23).toISOString() // +23h
  },
  {
    id: "11",
    title: "CRM Subscription",
    supplier: "Customer First",
    amountZar: 4200,
    thumbnailUrl: "https://picsum.photos/id/1110/200/120",
    imageUrl: "https://picsum.photos/id/1110/1200/720",
  },
  {
    id: "12",
    title: "Content Writing",
    supplier: "Word Smiths",
    amountZar: 2800,
    thumbnailUrl: "https://picsum.photos/id/1120/200/120",
    imageUrl: "https://picsum.photos/id/1120/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString() // +18h
  },
  {
    id: "13",
    title: "Website Hosting",
    supplier: "HostFast",
    amountZar: 650,
    thumbnailUrl: "https://picsum.photos/id/1130/200/120",
    imageUrl: "https://picsum.photos/id/1130/1200/720",
  },
  {
    id: "14",
    title: "Recruitment Fees (Duplicate)",
    supplier: "Connect HR",
    amountZar: 8900,
    thumbnailUrl: "https://picsum.photos/id/1025/200/120",
    imageUrl: "https://picsum.photos/id/1025/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString() // +26h (no button)
  },
  {
    id: "15",
    title: "Database Management",
    supplier: "Data Solutions",
    amountZar: 19500,
    thumbnailUrl: "https://picsum.photos/id/1140/200/120",
    imageUrl: "https://picsum.photos/id/1140/1200/720",
  },
  {
    id: "16",
    title: "IT Support",
    supplier: "IT Help",
    amountZar: 3200,
    thumbnailUrl: "https://picsum.photos/id/1150/200/120",
    imageUrl: "https://picsum.photos/id/1150/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString() // +1h
  },
  {
    id: "17",
    title: "Server Maintenance (Duplicate)",
    supplier: "TechOps Solutions",
    amountZar: 7300,
    thumbnailUrl: "https://picsum.photos/id/1075/200/120",
    imageUrl: "https://picsum.photos/id/1075/1200/720",
  },
  {
    id: "18",
    title: "Security Assessment",
    supplier: "Secure IT",
    amountZar: 25000,
    thumbnailUrl: "https://picsum.photos/id/1160/200/120",
    imageUrl: "https://picsum.photos/id/1160/1200/720",
  },
  {
    id: "19",
    title: "Team Building",
    supplier: "Corporate Fun",
    amountZar: 9500,
    thumbnailUrl: "https://picsum.photos/id/1170/200/120",
    imageUrl: "https://picsum.photos/id/1170/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString() // +10h
  },
  {
    id: "20",
    title: "Software License",
    supplier: "AppWorks",
    amountZar: 6800,
    thumbnailUrl: "https://picsum.photos/id/1180/200/120",
    imageUrl: "https://picsum.photos/id/1180/1200/720",
  },
  {
    id: "21",
    title: "Hardware Upgrade",
    supplier: "Future Tech",
    amountZar: 15000,
    thumbnailUrl: "https://picsum.photos/id/1190/200/120",
    imageUrl: "https://picsum.photos/id/1190/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString() // +4h
  },
  {
    id: "22",
    title: "Cloud Services Retainer (Duplicate)",
    supplier: "Thrive Business Solutions",
    amountZar: 12500.5,
    thumbnailUrl: "https://picsum.photos/id/1015/200/120",
    imageUrl: "https://picsum.photos/id/1015/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() // +2h
  },
  {
    id: "23",
    title: "Networking Equipment",
    supplier: "NetGear Pro",
    amountZar: 8500,
    thumbnailUrl: "https://picsum.photos/id/1200/200/120",
    imageUrl: "https://picsum.photos/id/1200/1200/720",
  },
  {
    id: "24",
    title: "Staff Training",
    supplier: "Skill Up",
    amountZar: 12000,
    thumbnailUrl: "https://picsum.photos/id/1210/200/120",
    imageUrl: "https://picsum.photos/id/1210/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 15).toISOString() // +15h
  },
  {
    id: "25",
    title: "HR Consulting",
    supplier: "People First",
    amountZar: 7600,
    thumbnailUrl: "https://picsum.photos/id/1220/200/120",
    imageUrl: "https://picsum.photos/id/1220/1200/720",
  },
  {
    id: "26",
    title: "Legal Fees (Duplicate)",
    supplier: "LexCorp Attorneys",
    amountZar: 21000,
    thumbnailUrl: "https://picsum.photos/id/1065/200/120",
    imageUrl: "https://picsum.photos/id/1065/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString() // +20h
  },
  {
    id: "27",
    title: "Web Development",
    supplier: "CodeCrafters",
    amountZar: 22000,
    thumbnailUrl: "https://picsum.photos/id/1230/200/120",
    imageUrl: "https://picsum.photos/id/1230/1200/720",
  },
  {
    id: "28",
    title: "Graphic Design",
    supplier: "Visuals Inc.",
    amountZar: 4500,
    thumbnailUrl: "https://picsum.photos/id/1240/200/120",
    imageUrl: "https://picsum.photos/id/1240/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString() // +8h
  },
  {
    id: "29",
    title: "Office Furniture",
    supplier: "Comfort Office",
    amountZar: 16000,
    thumbnailUrl: "https://picsum.photos/id/1250/200/120",
    imageUrl: "https://picsum.photos/id/1250/1200/720",
  },
  {
    id: "30",
    title: "Catering Service",
    supplier: "Gourmet Foods",
    amountZar: 3100,
    thumbnailUrl: "https://picsum.photos/id/1260/200/120",
    imageUrl: "https://picsum.photos/id/1260/1200/720",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 16).toISOString() // +16h
  },
];