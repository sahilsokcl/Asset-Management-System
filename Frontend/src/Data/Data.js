const data = {
    totals: {
      totalAssets: 231,
      totalComponents: 2424698,
      totalMaintenance: 237,
      totalEmployees: 79
    },
    assetTypes: [
      { type: "Hardwares", count: 20 },
      { type: "Extrusion", count: 15 },
      { type: "Notebook", count: 10 },
      { type: "AUTOMATIC TRANSFER SWITCH", count: 5 },
      { type: "SWITCHGEAR", count: 12 },
      { type: "TRANSFORMER", count: 8 },
      { type: "STRING BATTERY", count: 9 },
      { type: "IT Racks", count: 6 },
      { type: "FABD", count: 7 },
      { type: "UPS", count: 11 },
      { type: "Chair", count: 14 },
      { type: "TWO POST LIFTS", count: 3 },
      { type: "WHEEL ALIGNER", count: 4 },
      { type: "Laptop", count: 18 },
      { type: "Software", count: 15 }
    ],
    assetStatus: [
      { status: "Ready to deploy", count: 80 },
      { status: "Pending", count: 50 },
      { status: "Archived", count: 30 },
      { status: "Broken", count: 20 },
      { status: "Lost", count: 10 },
      { status: "Out of repair", count: 41 }
    ],
    recentAssetActivity: [
      {
        asset: "TOOL",
        employee: "YEE",
        status: "Check out",
        location: "Gasha high school - Erbil",
        date: "2024-07-10"
      },
      {
        asset: "TOOL",
        employee: "YEE",
        status: "Check in",
        location: "Gasha high school - Erbil",
        date: "2024-07-05"
      }
    ],
    recentComponentActivity: [
      {
        component: "tf",
        asset: "TESTING",
        quantity: 1,
        status: "Check in",
        location: "Gasha high school - Erbil",
        date: "2024-07-10"
      },
      {
        component: "tf",
        asset: "TESTING",
        quantity: 0,
        status: "Check out",
        location: "Gasha high school - Erbil",
        date: "2024-07-05"
      }
    ]
  };
  
  export default data;
  