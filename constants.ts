
import { HardwareData, AppSettings } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  // Theme
  themeMode: 'dark',
  accentColor: '#3b82f6',
  backgroundStyle: 'pattern',
  borderRadius: 4,
  uiDensity: 'normal',
  fontFamily: 'Inter',

  // Animation
  pageTransitions: true,
  componentFadeIns: true,
  diagramAnimations: true,
  performanceMeterAnimations: true,
  hoverEffects: true,
  parallaxEffects: false,
  reducedMotion: false,
  gpuAcceleration: true,

  // Layout
  gridStyle: 'grid',
  sidebarPosition: 'hidden',
  navigationStyle: 'top',
  layoutStyle: 'two-column',
  cardSize: 'medium',

  // Performance
  disableHeavyAnimations: false,
  disable3D: false,
  lazyLoading: true,
  imagePreloading: false,
  fpsLimit: 60,
  lowPowerMode: false,

  // Accessibility
  highContrast: false,
  dyslexiaFriendly: false,
  fontSizeScale: 1,
  keyboardNav: false,
  screenReaderHints: true,

  // Developer
  devMode: false,
  showComponentData: false,
  showFPS: false,
  showGridOverlay: false,
  showDebugOutlines: false,
  showComponentBoundaries: false,
};

export const COMPONENT_DB: Record<string, HardwareData> = {
  "cpu": {
      id: "cpu",
      name: "Central Processing Unit",
      role: "Instruction Execution Engine",
      desc: "The primary orchestrator of the computer. It executes instructions, calculates basic logic, and manages input/output flow.",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000", 
      diagramType: "processor",
      concepts: [
          { title: "IPC", text: "Instructions Per Clock. How efficiently the CPU works. High IPC means more work done per Hz." },
          { title: "Threads", text: "Virtual cores that allow the OS to multitask better. Crucial for rendering and encoding." },
          { title: "Cache (L3)", text: "High-speed memory on the chip itself to reduce the time CPU waits for RAM data." }
      ],
      architectureDeepDive: [
          "The CPU architecture is built upon the Von Neumann model, utilizing a fetch-decode-execute cycle. Modern processors, however, employ superscalar architectures, allowing them to dispatch multiple instructions per clock cycle to redundant execution units (ALUs, FPUs). This is achieved through Out-of-Order (OoO) execution, where the CPU reorders instructions to keep execution units busy while waiting for memory, and Speculative Execution, where Branch Predictors guess the outcome of if-statements to pre-process code paths.",
          "The physical limit of frequency scaling (Dennard Scaling) ended around 2006, leading to the 'Multi-Core Era'. Today's challenge is 'Dark Silicon'—the phenomenon where thermal constraints prevent all parts of the chip from being powered on simultaneously at full speed. This has led to the development of heterogeneous architectures (like Intel's big.LITTLE or ARM's DynamIQ), mixing high-performance cores with high-efficiency cores to optimize the performance-per-watt envelope."
      ],
      manufacturingProcess: [
          { step: "Silicon Ingot Growth", detail: "A seed crystal is dipped into molten silicon and rotated/pulled (Czochralski method) to grow a single pure crystal ingot, which is then sliced into 300mm wafers." },
          { step: "Photolithography (EUV)", detail: "Extreme Ultraviolet light (13.5nm wavelength) is projected through a mask onto the wafer coated with photoresist. This prints patterns as small as 3nm." },
          { step: "Doping & Etching", detail: "Ion implantation introduces impurities (Boron/Phosphorus) to alter conductivity, creating Transistors. Plasma etching removes unwanted material." },
          { step: "Interconnects", detail: "Copper or Cobalt wiring layers are built on top of the transistors (BEOL - Back End of Line) to connect the billions of gates." },
          { step: "Packaging", detail: "The die is cut, mounted onto a substrate, and covered with an Integrated Heat Spreader (IHS). Use of indium solder ensures thermal transfer." }
      ],
      techSpecs: [
          { key: "Socket", val: "LGA1700 / AM5" },
          { key: "Architecture", val: "x86-64" },
          { key: "Thermal Limit", val: "100°C (TJMax)" },
          { key: "Memory Support", val: "DDR4 / DDR5" },
          { key: "PCIe Lanes", val: "Gen 5.0 x16" }
      ],
      marketModels: [
          { 
              id: 101, name: "Intel Core i9-14900K", brand: "Intel",
              description: "The peak of raw frequency performance for enthusiasts.",
              specs: { "Cores": "24 (8P+16E)", "Boost": "6.0 GHz", "TDP": "253W", "L3 Cache": "36 MB" }
          },
          { 
              id: 102, name: "AMD Ryzen 9 7950X3D", brand: "AMD",
              description: "Gaming specialist with 3D V-Cache technology.",
              specs: { "Cores": "16", "Boost": "5.7 GHz", "TDP": "120W", "L3 Cache": "128 MB" }
          },
          { 
              id: 103, name: "Intel Core i7-14700K", brand: "Intel",
              description: "High-end all-rounder.",
              specs: { "Cores": "20 (8P+12E)", "Boost": "5.6 GHz", "TDP": "253W", "L3 Cache": "33 MB" }
          },
          { 
              id: 104, name: "AMD Ryzen 7 7800X3D", brand: "AMD",
              description: "The world's best gaming CPU.",
              specs: { "Cores": "8", "Boost": "5.0 GHz", "TDP": "120W", "L3 Cache": "96 MB" }
          },
          { 
              id: 105, name: "Intel Core i5-13600K", brand: "Intel",
              description: "Best value performance king.",
              specs: { "Cores": "14 (6P+8E)", "Boost": "5.1 GHz", "TDP": "181W", "L3 Cache": "24 MB" }
          },
          {
              id: 106, name: "Intel Core i3-14100F", brand: "Intel",
              description: "Entry-level gaming champion.",
              specs: { "Cores": "4 (4P+0E)", "Boost": "4.7 GHz", "TDP": "58W", "L3 Cache": "12 MB" }
          },
          {
              id: 107, name: "AMD Ryzen 5 7600", brand: "AMD",
              description: "Efficient mid-range powerhouse.",
              specs: { "Cores": "6", "Boost": "5.1 GHz", "TDP": "65W", "L3 Cache": "32 MB" }
          }
      ]
  },
  "gpu": {
      id: "gpu",
      name: "Graphics Processing Unit",
      role: "Parallel Rasterization Engine",
      desc: "Specialized circuitry designed to manipulate memory to accelerate image creation. It's the engine for gaming and ML.",
      image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1000",
      diagramType: "card",
      concepts: [
          { title: "VRAM Bandwidth", text: "How fast data moves to the core. More critical than pure GB count at 4K." },
          { title: "CUDA / Stream", text: "The individual mini-cores that process pixels in parallel." },
          { title: "Ray Tracing", text: "Real-time calculation of light paths. Extremely taxing on hardware." }
      ],
      architectureDeepDive: [
          "Unlike CPUs which are latency-optimized (doing one thing very quickly), GPUs are throughput-optimized (doing thousands of things simultaneously). The architecture is divided into Streaming Multiprocessors (SMs) or Compute Units (CUs), each containing clusters of FP32 (Floating Point) and INT32 (Integer) cores. This massive parallelism is ideal for the mathematical matrices involved in 3D vertex transformations and pixel shading.",
          "Modern GPU architecture includes specialized silicon: RT Cores (Ray Tracing) calculate Bounding Volume Hierarchy (BVH) intersections to simulate light, while Tensor Cores (AI) perform matrix multiplication for Deep Learning Super Sampling (DLSS). The memory subsystem typically uses GDDR6 or HBM (High Bandwidth Memory), utilizing ultra-wide bus widths (up to 384-bit or higher) to feed the voracious appetite of the core."
      ],
      manufacturingProcess: [
          { step: "Reticle Fabrication", detail: "Designs are etched onto quartz plates (reticles). GPUs are massive chips (up to 600mm²), meaning fewer chips per wafer and higher defect risk." },
          { step: "Die Probing", detail: "Before packaging, the wafer is probed. Defective cores are laser-disabled, creating lower-tier SKUs (binning). Example: A 4090 is a slightly cut-down AD102 die." },
          { step: "Flip-Chip Assembly", detail: "The die is flipped upside down and connected to the substrate via thousands of solder bumps (C4 bumps) rather than wire bonds for better electrical performance." },
          { step: "SMT Component Placement", detail: "Robotic arms place VRAM chips, VRMs (Voltage Regulator Modules), and capacitors onto the PCB around the GPU socket." },
          { step: "Heatsink Vapor Chamber", detail: "A copper vapor chamber is vacuum-sealed with a small amount of liquid. It's bolted to the die with high-pressure mounting to ensure contact." }
      ],
      techSpecs: [
          { key: "Interface", val: "PCIe 4.0 x16" },
          { key: "Memory Type", val: "GDDR6X" },
          { key: "Outputs", val: "DP 1.4 / HDMI 2.1" },
          { key: "Power", val: "12VHPWR / 8-pin" }
      ],
      marketModels: [
          {
              id: 201, name: "NVIDIA RTX 4090", brand: "NVIDIA", description: "Absolute flagship powerhouse.",
              specs: { "VRAM": "24GB GDDR6X", "Cores": "16,384", "TGP": "450W", "Bus": "384-bit" }
          },
          {
              id: 202, name: "AMD RX 7900 XTX", brand: "AMD", description: "Pure rasterization monster.",
              specs: { "VRAM": "24GB GDDR6", "Cores": "6,144", "TGP": "355W", "Bus": "384-bit" }
          },
          {
              id: 203, name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", description: "High-end 4K gaming card.",
              specs: { "VRAM": "16GB GDDR6X", "Cores": "10,240", "TGP": "320W", "Bus": "256-bit" }
          },
          {
              id: 204, name: "AMD RX 7800 XT", brand: "AMD", description: "1440p Value Champion.",
              specs: { "VRAM": "16GB GDDR6", "Cores": "3,840", "TGP": "263W", "Bus": "256-bit" }
          },
          {
              id: 205, name: "NVIDIA RTX 4070 Ti Super", brand: "NVIDIA", description: "Balanced performance and AI.",
              specs: { "VRAM": "16GB GDDR6X", "Cores": "8,448", "TGP": "285W", "Bus": "256-bit" }
          },
          {
              id: 206, name: "Intel Arc A770", brand: "Intel", description: "The blue team's best effort.",
              specs: { "VRAM": "16GB GDDR6", "Cores": "4,096", "TGP": "225W", "Bus": "256-bit" }
          },
          {
              id: 207, name: "NVIDIA RTX 4060", brand: "NVIDIA", description: "1080p Mainstream choice.",
              specs: { "VRAM": "8GB GDDR6", "Cores": "3,072", "TGP": "115W", "Bus": "128-bit" }
          }
      ]
  },
  "motherboard": {
      id: "motherboard",
      name: "Mainboard PCB",
      role: "System Interconnect Hub",
      desc: "The circuit board that connects all hardware. It handles power delivery (VRMs) and data pathways (PCIe).",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "VRM Phases", text: "Voltage Regulator Modules. More phases = cleaner, stable power for the CPU." },
          { title: "Chipset", text: "Controls peripheral communication (USB, SATA, PCIe lanes)." },
          { title: "Form Factor", text: "Physical size standard (ATX, ITX, E-ATX)." }
      ],
      architectureDeepDive: [
          "The motherboard is a multi-layered Printed Circuit Board (PCB), often 6 to 12 layers deep, designed to minimize signal interference (crosstalk) between high-speed data lines like PCIe Gen5 and DDR5 memory channels. A critical subsystem is the VRM (Voltage Regulator Module), which steps down the 12V from the PSU to the ~1.1V required by the CPU. This conversion utilizes a PWM controller, Drivers, and MOSFETs. High-end boards use 'Smart Power Stages' (SPS) which integrate current monitoring directly into the MOSFET for precise load balancing.",
          "The Chipset (Southbridge) acts as a traffic cop for slower I/O (USB, SATA, Audio), connecting to the CPU via a DMI (Direct Media Interface) link. Differential signaling is used for almost all modern data paths, sending a signal and its inverse down two wires to cancel out electromagnetic interference."
      ],
      manufacturingProcess: [
          { step: "PCB Layering", detail: "Sheets of copper foil are laminated onto fiberglass epoxy resin (FR4). Photosensitive film is applied, exposed to UV light, and etched to create traces." },
          { step: "Drilling & Plating", detail: "Micro-vias are drilled to connect different layers of the PCB. The holes are plated with copper to ensure electrical continuity between layers." },
          { step: "Solder Paste Printing", detail: "A stencil is placed over the board, and solder paste is squeegeed over it, depositing paste only on the pads where components will sit." },
          { step: "Pick and Place", detail: "High-speed machines place thousands of surface-mount devices (SMDs) like resistors, capacitors, and ICs onto the paste at speeds of 100,000 cph." },
          { step: "Reflow Oven", detail: "The board travels through an oven with controlled temperature zones, melting the solder paste to form permanent electrical and mechanical bonds." }
      ],
      techSpecs: [
          { key: "Format", val: "ATX / mATX / ITX" },
          { key: "Power", val: "24-pin ATX" },
          { key: "Storage", val: "M.2 NVMe Gen5" },
          { key: "Network", val: "WiFi 7 / 10GbE" }
      ],
      marketModels: [
          {
              id: 301, name: "ASUS ROG Maximus Z790 Hero", brand: "ASUS", description: "Premium overclocking foundation.",
              specs: { "Socket": "LGA1700", "VRM": "20+1 Phases", "RAM": "DDR5 7800+", "Format": "ATX" }
          },
          {
              id: 302, name: "MSI MPG B650I Edge WiFi", brand: "MSI", description: "High-end ITX choice for AMD.",
              specs: { "Socket": "AM5", "VRM": "8+2+1 Phases", "RAM": "DDR5 6400+", "Format": "Mini-ITX" }
          },
          {
              id: 303, name: "Gigabyte X670E AORUS Master", brand: "Gigabyte", description: "Extreme connectivity for AMD.",
              specs: { "Socket": "AM5", "VRM": "16+2+2 Phases", "RAM": "DDR5 8000+", "Format": "E-ATX" }
          },
          {
              id: 304, name: "ASRock Z790 Taichi Lite", brand: "ASRock", description: "Flagship features, lower price.",
              specs: { "Socket": "LGA1700", "VRM": "24+1+2 Phases", "RAM": "DDR5 7200+", "Format": "E-ATX" }
          },
          {
              id: 305, name: "ASUS TUF Gaming B650-PLUS", brand: "ASUS", description: "Reliable military-grade standard.",
              specs: { "Socket": "AM5", "VRM": "12+2 Phases", "RAM": "DDR5 6400+", "Format": "ATX" }
          },
          {
              id: 306, name: "Gigabyte B650 Aorus Elite", brand: "Gigabyte", description: "Fan-favorite mid-range board.",
              specs: { "Socket": "AM5", "VRM": "14+2+1 Phases", "RAM": "DDR5 6600+", "Format": "ATX" }
          },
          {
              id: 307, name: "MSI MAG Z790 Tomahawk", brand: "MSI", description: "The all-black stealth option.",
              specs: { "Socket": "LGA1700", "VRM": "16+1+1 Phases", "RAM": "DDR5 7200+", "Format": "ATX" }
          }
      ]
  },
  "ram": {
      id: "ram",
      name: "Random Access Memory",
      role: "Volatile High-Speed Storage",
      desc: "Temporary workspace for the CPU. Faster RAM reduces CPU wait times, improving minimum framerates.",
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "Frequency", text: "Measured in MT/s. Higher is faster data transfer." },
          { title: "CAS Latency", text: "CL timing. Lower means quicker access to data." },
          { title: "Dual Channel", text: "Using two sticks doubles bandwidth." }
      ],
      architectureDeepDive: [
          "DRAM (Dynamic Random Access Memory) stores bits of data in memory cells consisting of a capacitor and a transistor. Because capacitors leak charge over time, the data must be electronically 'refreshed' every few milliseconds, hence 'Dynamic'. DDR (Double Data Rate) memory transfers data on both the rising and falling edges of the clock signal, effectively doubling bandwidth per clock.",
          "DDR5 introduces On-Die ECC (Error Correction Code) to fix bit flips at the chip level, crucial for the reliability of high-density nodes. It also splits the 64-bit channel into two independent 32-bit sub-channels per DIMM, increasing efficiency by allowing the memory controller to access different banks simultaneously."
      ],
      manufacturingProcess: [
          { step: "Cell Fabrication", detail: "DRAM cells are fabricated using deep trench capacitors or stacked capacitors to maximize charge storage in a minimal footprint on the silicon wafer." },
          { step: "Wafer Testing", detail: "Probing checks for weak cells. Redundant rows/columns built into the chip are fused to replace defective ones, a process known as 'Repair'." },
          { step: "Die Packaging (BGA)", detail: "Silicon dies are packaged into Ball Grid Arrays (BGA). This package protects the die and provides the solder balls for mounting." },
          { step: "Module Assembly", detail: "Multiple BGA chips are soldered onto a PCB stick. For DDR5, a PMIC (Power Management IC) is also soldered directly onto the stick." },
          { step: "SPD Programming", detail: "The Serial Presence Detect (SPD) chip is programmed with the memory's timings (XMP/EXPO profiles), allowing the BIOS to auto-configure speed." }
      ],
      techSpecs: [
          { key: "Type", val: "DDR5 SDRAM" },
          { key: "Module", val: "DIMM 288-pin" },
          { key: "Voltage", val: "1.1V - 1.45V" },
          { key: "ECC", val: "On-Die (DDR5)" }
      ],
      marketModels: [
          {
              id: 401, name: "G.SKILL Trident Z5 RGB", brand: "G.SKILL", description: "Extreme performance kit.",
              specs: { "Capacity": "32GB (2x16)", "Speed": "7200 MT/s", "Latency": "CL34", "Voltage": "1.4V" }
          },
          {
              id: 402, name: "Corsair Vengeance", brand: "Corsair", description: "Reliable standard for DDR5.",
              specs: { "Capacity": "64GB (2x32)", "Speed": "6000 MT/s", "Latency": "CL30", "Voltage": "1.35V" }
          },
           {
              id: 403, name: "Kingston Fury Beast", brand: "Kingston", description: "Low profile performance.",
              specs: { "Capacity": "32GB (2x16)", "Speed": "5600 MT/s", "Latency": "CL36", "Voltage": "1.25V" }
          },
          {
              id: 404, name: "TeamGroup T-Force Delta", brand: "TeamGroup", description: "Aggressive RGB styling.",
              specs: { "Capacity": "32GB (2x16)", "Speed": "6400 MT/s", "Latency": "CL40", "Voltage": "1.35V" }
          },
          {
              id: 405, name: "Crucial Pro DDR5", brand: "Crucial", description: "Plug and play stability.",
              specs: { "Capacity": "32GB (2x16)", "Speed": "5600 MT/s", "Latency": "CL46", "Voltage": "1.1V" }
          },
          {
              id: 406, name: "Corsair Dominator Titanium", brand: "Corsair", description: "Premium swappable top bar design.",
              specs: { "Capacity": "48GB (2x24)", "Speed": "7000 MT/s", "Latency": "CL34", "Voltage": "1.4V" }
          },
          {
              id: 407, name: "Patriot Viper Venom", brand: "Patriot", description: "Cost-effective high speed.",
              specs: { "Capacity": "32GB (2x16)", "Speed": "7400 MT/s", "Latency": "CL36", "Voltage": "1.45V" }
          }
      ]
  },
  "storage": {
      id: "storage",
      name: "Solid State Drive",
      role: "Persistent Data Storage",
      desc: "Non-volatile memory for OS and Games. NVMe drives communicate directly with CPU via PCIe lanes.",
      // UPDATED: Verified M.2 NVMe Shot (Stick in slot)
      image: "https://plus.unsplash.com/premium_photo-1721133221361-4f2b2af3b6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      diagramType: "generic",
      concepts: [
          { title: "Sequential R/W", text: "Top speed for large file transfers." },
          { title: "IOPS", text: "Input/Output Operations Per Second. Critical for game loading and OS feel." },
          { title: "Endurance (TBW)", text: "Terabytes Written. How long the drive lasts." }
      ],
      architectureDeepDive: [
          "SSDs use NAND Flash memory, which traps electrons in floating gates or charge traps to represent binary data. Modern drives use 3D NAND, stacking up to 232 layers of cells vertically to increase density. To store more data, cells operate in TLC (3 bits per cell) or QLC (4 bits per cell) modes, which requires distinguishing between 8 or 16 discrete voltage levels, respectively.",
          "The Controller is an embedded processor that manages the data. It handles Wear Leveling (spreading writes evenly to prevent cell burnout), Garbage Collection (consolidating valid data to free up blocks), and Error Correction. A DRAM cache (or Host Memory Buffer in cheaper drives) acts as a map, telling the controller exactly where data sits physically on the NAND chips."
      ],
      manufacturingProcess: [
          { step: "3D NAND Deposition", detail: "Alternating layers of conductive and insulating material are deposited. A vertical channel is drilled through hundreds of layers to create the cell strings." },
          { step: "Wafer Dicing", detail: "The NAND silicon wafer is diamond-cut into individual dies. These are stacked and wire-bonded to form the black storage chips seen on the drive." },
          { step: "Controller Fabrication", detail: "The SSD controller is fabricated on a logic process node (like 12nm or 7nm), similar to a simplified CPU." },
          { step: "SMT Assembly", detail: "Controller, NAND packs, and DRAM cache are soldered onto the M.2 PCB. Components are often placed on just one side for thermal management." },
          { step: "Firmware Flashing", detail: "The drive is loaded with proprietary firmware that defines how it manages the flash translation layer and thermal throttling behaviors." }
      ],
      techSpecs: [
          { key: "Interface", val: "M.2 PCIe 4.0/5.0" },
          { key: "NAND Type", val: "3D TLC" },
          { key: "Cache", val: "DRAM Buffered" },
          { key: "Size", val: "2280" }
      ],
      marketModels: [
          {
              id: 501, name: "Samsung 990 Pro", brand: "Samsung", description: "The gold standard for Gen4.",
              specs: { "Capacity": "2TB", "Seq Read": "7450 MB/s", "Seq Write": "6900 MB/s", "Cache": "2GB LPDDR4" }
          },
          {
              id: 502, name: "WD Black SN850X", brand: "WD", description: "Top tier gaming drive.",
              specs: { "Capacity": "4TB", "Seq Read": "7300 MB/s", "Seq Write": "6600 MB/s", "Cache": "DRAM" }
          },
          {
              id: 503, name: "Crucial T700", brand: "Crucial", description: "Gen5 speed demon.",
              specs: { "Capacity": "2TB", "Seq Read": "12,400 MB/s", "Seq Write": "11,800 MB/s", "Cache": "DRAM" }
          },
          {
              id: 504, name: "Sabrent Rocket 4 Plus", brand: "Sabrent", description: "High capacity endurance.",
              specs: { "Capacity": "8TB", "Seq Read": "7100 MB/s", "Seq Write": "6600 MB/s", "Cache": "DRAM" }
          },
          {
              id: 505, name: "Lexar NM790", brand: "Lexar", description: "DRAM-less efficiency king.",
              specs: { "Capacity": "4TB", "Seq Read": "7400 MB/s", "Seq Write": "6500 MB/s", "Cache": "HMB" }
          },
          {
              id: 506, name: "Seagate FireCuda 530", brand: "Seagate", description: "Incredible endurance rating.",
              specs: { "Capacity": "2TB", "Seq Read": "7300 MB/s", "Seq Write": "6900 MB/s", "Cache": "DRAM" }
          },
          {
              id: 507, name: "Kingston KC3000", brand: "Kingston", description: "Reliable Phison E18 drive.",
              specs: { "Capacity": "2TB", "Seq Read": "7000 MB/s", "Seq Write": "7000 MB/s", "Cache": "DRAM" }
          }
      ]
  },
  "psu": {
      id: "psu",
      name: "Power Supply Unit",
      role: "Voltage Rectifier & Delivery",
      desc: "Converts AC wall power to DC voltages (12V, 5V, 3.3V) required by PC components. The heart of stability.",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "80+ Rating", text: "Efficiency standard (Gold/Platinum). Less heat waste." },
          { title: "Modular", text: "Detachable cables for cleaner builds." },
          { title: "ATX 3.0", text: "Standard handling high power spikes for modern GPUs." }
      ],
      architectureDeepDive: [
          "Modern high-efficiency PSUs utilize an LLC Resonant topology with DC-to-DC conversion. The incoming AC power (110V/230V) is first filtered (Transient Filter) to remove noise and surge spikes. It's then rectified to high-voltage DC and boosted by the Active Power Factor Correction (APFC) circuit to maintain efficiency.",
          "The main transformer steps this high voltage down to 12V DC. In older designs, 5V and 3.3V were also generated by the transformer (Group Regulation), but modern units use DC-to-DC converters on the secondary side to step down 12V into 5V/3.3V. This ensures that heavy 12V load (like a GPU) doesn't cause the 5V voltage to sag, providing superior voltage regulation (often under 1% deviation)."
      ],
      manufacturingProcess: [
          { step: "PCB Population", detail: "Through-hole components (large capacitors, coils, transformers) are manually or robotically inserted into the PCB." },
          { step: "Wave Soldering", detail: "The bottom of the board passes over a wave of molten solder, instantly soldering all component legs. Surface mount parts are done separately." },
          { step: "Chroma Testing", detail: "Completed units are connected to 'Chroma' load testers that simulate various power draws to verify efficiency, voltage stability, and ripple suppression." },
          { step: "Burn-In", detail: "Units are run at high load in a hot room (40-50°C) for an extended period to trigger 'infant mortality' failures before shipping." },
          { step: "Cable Assembly", detail: "Modular cables are crimped, sleeved, and tested for continuity. Capacitor-in-cable designs are added here for ripple reduction." }
      ],
      techSpecs: [
          { key: "Form Factor", val: "ATX / SFX" },
          { key: "Rail", val: "Single 12V Rail" },
          { key: "Fan Mode", val: "Zero RPM (Hybrid)" },
          { key: "Protection", val: "OVP, OPP, SCP" }
      ],
      marketModels: [
          {
              id: 601, name: "Corsair RM1000x Shift", brand: "Corsair", description: "Side-mounted interface for easy access.",
              specs: { "Wattage": "1000W", "Rating": "80+ Gold", "Modular": "Fully", "ATX 3.0": "Yes" }
          },
          {
              id: 602, name: "Seasonic Vertex GX-1200", brand: "Seasonic", description: "Legendary reliability.",
              specs: { "Wattage": "1200W", "Rating": "80+ Gold", "Modular": "Fully", "ATX 3.0": "Yes" }
          },
          {
              id: 603, name: "MSI MEG Ai1300P", brand: "MSI", description: "Smart digital power supply.",
              specs: { "Wattage": "1300W", "Rating": "80+ Platinum", "Modular": "Fully", "ATX 3.0": "Yes" }
          },
          {
              id: 604, name: "Be Quiet! Dark Power 13", brand: "Be Quiet!", description: "Titanium efficiency silence.",
              specs: { "Wattage": "1000W", "Rating": "80+ Titanium", "Modular": "Fully", "ATX 3.0": "Yes" }
          },
          {
              id: 605, name: "Corsair SF750", brand: "Corsair", description: "The SFF gold standard.",
              specs: { "Wattage": "750W", "Rating": "80+ Platinum", "Modular": "Fully", "ATX 3.0": "No" }
          },
          {
              id: 606, name: "EVGA SuperNOVA 1000 GT", brand: "EVGA", description: "Compact 1000W size.",
              specs: { "Wattage": "1000W", "Rating": "80+ Gold", "Modular": "Fully", "ATX 3.0": "Yes" }
          },
          {
              id: 607, name: "Thermaltake Toughpower GF3", brand: "Thermaltake", description: "Native PCIE 5.0 connector.",
              specs: { "Wattage": "1200W", "Rating": "80+ Gold", "Modular": "Fully", "ATX 3.0": "Yes" }
          }
      ]
  },
  "casing": {
      id: "casing",
      name: "Chassis Enclosure",
      role: "Structural & Airflow Framework",
      desc: "Houses all components. Critical for airflow direction, dust filtration, and acoustic dampening.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "Airflow Path", text: "Positive vs Negative pressure setups." },
          { title: "Radiator Support", text: "Space for AIO liquid cooling (360mm, 420mm)." },
          { title: "Cable Mgmt", text: "Space behind motherboard tray for routing." }
      ],
      architectureDeepDive: [
          "Case engineering focuses on Fluid Dynamics and Acoustic Resonance. Positive Pressure setups (more intake than exhaust) force air out of unfiltered cracks, preventing dust buildup. Negative Pressure (more exhaust) draws air in through cracks but can offer superior cooling for specific GPU configurations.",
          "Structural rigidity is paramount to prevent vibration amplification from fans and HDDs. This is achieved through folded steel edges and rivets. Modern 'Dual Chamber' designs (like the O11 Dynamic) separate the heat-generating CPU/GPU from the PSU and storage, creating dedicated thermal zones and simplifying cable management by hiding the mess in the rear chamber."
      ],
      manufacturingProcess: [
          { step: "Steel Stamping", detail: "Galvanized cold-rolled steel (SECC) sheets are fed into hydraulic presses with dies that cut, punch, and fold the metal into the chassis frame." },
          { step: "CNC Machining", detail: "Aluminum panels (for premium cases) are CNC milled from solid blocks or thick sheets for a brushed, seamless finish." },
          { step: "Powder Coating", detail: "An electrostatic charge is applied to the metal, attracting dry powder paint. The part is baked, curing the powder into a durable, chip-resistant finish." },
          { step: "Tempered Glass", detail: "Glass panels are heated to ~620°C and rapidly cooled (quenching). This creates surface compression, making the glass 4x stronger than annealed glass." },
          { step: "Riveting", detail: "The frame components are permanently joined using pop rivets, providing structural integrity without the loosening risk of screws." }
      ],
      techSpecs: [
          { key: "Material", val: "Steel / Tempered Glass" },
          { key: "Mobo Support", val: "E-ATX to ITX" },
          { key: "Max GPU", val: "400mm+" },
          { key: "IO", val: "USB-C Gen2" }
      ],
      marketModels: [
          {
              id: 701, name: "Lian Li O11 Dynamic EVO", brand: "Lian Li", description: "The showcase standard.",
              specs: { "Type": "Dual Chamber", "Fans": "Up to 10", "Glass": "Front/Side", "Vol": "Mid Tower" }
          },
          {
              id: 702, name: "Fractal North", brand: "Fractal", description: "Wood accent elegance.",
              specs: { "Type": "Airflow Focus", "Fans": "2x 140mm Inc", "Front": "Oak/Walnut", "Vol": "Mid Tower" }
          },
          {
              id: 703, name: "NZXT H9 Flow", brand: "NZXT", description: "Uninterrupted glass view.",
              specs: { "Type": "Dual Chamber", "Fans": "4x 120mm Inc", "Glass": "Wrap-around", "Vol": "Mid Tower" }
          },
          {
              id: 704, name: "Corsair 5000D Airflow", brand: "Corsair", description: "Optimized for cooling.",
              specs: { "Type": "Standard", "Fans": "2x 120mm Inc", "Glass": "Side", "Vol": "Mid Tower" }
          },
          {
              id: 705, name: "Hyte Y70 Touch", brand: "Hyte", description: "Integrated 4K Touchscreen.",
              specs: { "Type": "Showcase", "Fans": "None Inc", "Glass": "Panoramic", "Vol": "Mid Tower" }
          },
          {
              id: 706, name: "Cooler Master MasterBox NR200P", brand: "Cooler Master", description: "The ITX legend.",
              specs: { "Type": "SFF", "Fans": "2x 120mm", "Glass": "Side/Vented", "Vol": "Mini ITX" }
          },
          {
              id: 707, name: "Phanteks NV7", brand: "Phanteks", description: "Full tower showcase frame.",
              specs: { "Type": "Showcase", "Fans": "Up to 12", "Glass": "Seamless", "Vol": "Full Tower" }
          }
      ]
  },
  "cooling": {
      id: "cooling",
      name: "Thermal Solution",
      role: "Heat Dissipation System",
      desc: "Removes heat from the CPU IHS. Can be Air (heatsink) or Liquid (AIO/Custom Loop).",
      // RESTORED: Previous image (Heatsink/Cooler)
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "TDP Rating", text: "Thermal Design Power. How many watts of heat it can handle." },
          { title: "Pump Speed", text: "RPM of the liquid mover. Higher is better cooling but louder." },
          { title: "Coldplate", text: "Copper contact surface flatness." }
      ],
      architectureDeepDive: [
          "Liquid cooling operates on the principle of thermal mass and phase change (in heatpipes) or convection (in loops). In an AIO (All-in-One), a copper cold plate with microscopic fins (micro-channels) absorbs heat from the CPU. Water (coolant with glycol for anti-corrosion) is pumped through these fins, absorbing the heat.",
          "The heated water flows to the radiator, where it is distributed into thin flat channels connected by corrugated aluminum fins. Fans force cool air through these fins, dissipating the heat. The efficiency relies on the surface area of the radiator (FPI - Fins Per Inch) and the flow rate of the pump. Galvanic corrosion is a key engineering challenge, solved by using mixed-metal inhibitors when Aluminum radiators are paired with Copper blocks."
      ],
      manufacturingProcess: [
          { step: "Skiving (Cold Plate)", detail: "A block of copper is sliced thinly by a sharp blade without removing material, lifting the metal up to form extremely thin fins (0.1mm) for maximum surface area." },
          { step: "Radiator Brazing", detail: "Aluminum channels and folded fin stacks are assembled and passed through a brazing furnace, melting the cladding to fuse the unit into a single thermal body." },
          { step: "Pump Assembly", detail: "Ceramic bearings are used for the impeller shaft to ensure longevity and silence. The impeller is magnetically driven to separate the motor from the fluid." },
          { step: "Filling & Sealing", detail: "The loop is vacuum-filled with coolant to remove all air bubbles (which cause noise and reduce performance) and permanently sealed." },
          { step: "Leak Testing", detail: "Every unit undergoes pressure testing to ensure the O-rings and tube fittings can withstand the thermal expansion of the liquid during operation." }
      ],
      techSpecs: [
          { key: "Type", val: "AIO Liquid / Air Tower" },
          { key: "Material", val: "Aluminum Rad / Copper Base" },
          { key: "Fans", val: "PWM Static Pressure" },
          { key: "Socket", val: "Universal" }
      ],
      marketModels: [
          {
              id: 801, name: "NZXT Kraken Elite 360", brand: "NZXT", description: "High performance with LCD screen.",
              specs: { "Rad Size": "360mm", "Pump": "Asetek 7th Gen", "Screen": "2.36\" LCD", "Fans": "F120P" }
          },
          {
              id: 802, name: "Noctua NH-D15 G2", brand: "Noctua", description: "King of air cooling.",
              specs: { "Type": "Dual Tower", "Fans": "2x 140mm", "Heatpipes": "8", "Noise": "Low" }
          },
          {
              id: 803, name: "Arctic Liquid Freezer III", brand: "Arctic", description: "Best price to performance.",
              specs: { "Rad Size": "360mm", "Pump": "VRM Fan Inc", "Screen": "None", "Fans": "P12 PWM" }
          },
          {
              id: 804, name: "DeepCool LT720", brand: "DeepCool", description: "Unique geometric block design.",
              specs: { "Rad Size": "360mm", "Pump": "4th Gen", "Screen": "Infinity Mirror", "Fans": "FK120" }
          },
          {
              id: 805, name: "Corsair iCUE H150i Elite", brand: "Corsair", description: "RGB Ecosystem integration.",
              specs: { "Rad Size": "360mm", "Pump": "Centrifugal", "Screen": "LCD Option", "Fans": "AF120" }
          },
          {
              id: 806, name: "EK-Nucleus AIO CR360", brand: "EKWB", description: "Custom loop grade performance.",
              specs: { "Rad Size": "360mm", "Pump": "EK V2", "Screen": "Rotatable Top", "Fans": "FPT 120" }
          },
          {
              id: 807, name: "Thermalright Peerless Assassin", brand: "Thermalright", description: "Value air cooling king.",
              specs: { "Type": "Dual Tower", "Fans": "2x 120mm", "Heatpipes": "6", "Noise": "Moderate" }
          }
      ]
  },
  "fans": {
      id: "fans",
      name: "Airflow Fans",
      role: "Active Air Displacement",
      desc: "Moves cool air in and hot air out. Balance between static pressure (radiators) and airflow (case).",
      // UPDATED: Verified RGB Fan Close-up (Not a laptop)
      image: "https://images.unsplash.com/photo-1758578070283-a043877912f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      diagramType: "generic",
      concepts: [
          { title: "CFM", text: "Cubic Feet per Minute. Volume of air moved." },
          { title: "Static Pressure", text: "mmH2O. Ability to push air through resistance (filters/radiators)." },
          { title: "PWM", text: "Pulse Width Modulation. Precise speed control." }
      ],
      architectureDeepDive: [
          "Fan engineering is a battle between Aerodynamics and Acoustics. The blade geometry determines the P-Q Curve (Pressure vs Quantity). Broad, overlapping blades create high Static Pressure (pushing through radiators), while thin, steep-angle blades maximize Airflow (CFM) for open cases.",
          "The bearing type dictates lifespan and noise profile. Rifle and Sleeve bearings are cheap but wear out if mounted horizontally. Fluid Dynamic Bearings (FDB) and Magnetic Levitation (MagLev) use oil or magnetic fields to stabilize the shaft, eliminating friction. Advanced fans use Liquid Crystal Polymer (LCP) blades, a material so rigid it doesn't deform at high RPMs, allowing the blade tip to be mere millimeters from the frame, reducing efficiency-killing tip leakage."
      ],
      manufacturingProcess: [
          { step: "Injection Molding", detail: "Plastic pellets (PBT or LCP) are melted and injected into a steel mold to form the impeller (blades) and the frame. LCP requires much higher temperatures." },
          { step: "Stator Winding", detail: "Copper wire is wound around the steel stator poles. The pattern of winding determines the motor's phase characteristics (single-phase vs 3-phase)." },
          { step: "Magnetization", detail: "A rubberized magnet strip inside the fan hub is magnetized with alternating north/south poles to interact with the stator's electromagnetic field." },
          { step: "Balancing", detail: "The assembled impeller is spun. Lasers detect wobble, and small amounts of material are drilled out or added (balancing putty) to ensure perfect rotation." },
          { step: "Bearing Assembly", detail: "The shaft is inserted into the bearing housing. For FDB, precise amounts of lubricant are injected and sealed with a locking washer." }
      ],
      techSpecs: [
          { key: "Bearing", val: "Fluid Dynamic (FDB)" },
          { key: "Size", val: "120mm / 140mm" },
          { key: "Connector", val: "4-pin PWM" },
          { key: "RGB", val: "Addressable (ARGB)" }
      ],
      marketModels: [
          {
              id: 901, name: "Lian Li Uni Fan SL-INF", brand: "Lian Li", description: "Daisy-chain infinity mirror fans.",
              specs: { "RPM": "2100", "CFM": "61.3", "Pressure": "2.66", "Connect": "Magnetic" }
          },
          {
              id: 902, name: "Phanteks T30", brand: "Phanteks", description: "Thick industrial performance.",
              specs: { "RPM": "3000 (Max)", "CFM": "101", "Pressure": "7.11", "Thickness": "30mm" }
          },
          {
              id: 903, name: "Noctua NF-A12x25", brand: "Noctua", description: "Sterrox LCP engineering marvel.",
              specs: { "RPM": "2000", "CFM": "60", "Pressure": "2.34", "Thickness": "25mm" }
          },
          {
              id: 904, name: "Corsair QX120 RGB", brand: "Corsair", description: "iCUE Link single cable system.",
              specs: { "RPM": "2400", "CFM": "63.1", "Pressure": "3.8", "Connect": "Link Hub" }
          },
          {
              id: 905, name: "Be Quiet! Silent Wings 4", brand: "Be Quiet!", description: "Inaudible operation.",
              specs: { "RPM": "1600", "CFM": "48.7", "Pressure": "1.79", "Thickness": "25mm" }
          },
          {
              id: 906, name: "Thermaltake SWAFAN EX12", brand: "Thermaltake", description: "Swappable fan blades.",
              specs: { "RPM": "2000", "CFM": "57", "Pressure": "2.39", "Connect": "Magnetic" }
          },
          {
              id: 907, name: "Cooler Master Mobius 120 OC", brand: "Cooler Master", description: "Ring blade design.",
              specs: { "RPM": "3200", "CFM": "88", "Pressure": "4.75", "Thickness": "25mm" }
          }
      ]
  },
  "monitor": {
      id: "monitor",
      name: "Display Output",
      role: "Visual Interface",
      desc: "The final output device. High refresh rates and pixel response times are crucial for gaming fluidity.",
      // UPDATED: Dedicated Monitor Image
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000",
      diagramType: "generic",
      concepts: [
          { title: "Refresh Rate", text: "Hz. Times per second the screen updates." },
          { title: "Response Time", text: "GtG. How fast pixels change color. OLED is instant." },
          { title: "HDR", text: "High Dynamic Range. Peak brightness and contrast." }
      ],
      architectureDeepDive: [
          "Display technology revolves around the manipulation of light. LCDs (IPS/VA) use a backlight shining through a layer of liquid crystals which twist to block or let light pass through red, green, and blue subpixels. OLED (Organic Light Emitting Diode) removes the backlight entirely; each subpixel is its own light source, allowing for true blacks (infinite contrast) and near-instant response times (<0.03ms).",
          "QD-OLED (Quantum Dot OLED) improves on this by using a blue OLED layer to excite a layer of quantum dots. These dots emit extremely pure red and green light, resulting in a color gamut (Rec. 2020 coverage) that exceeds traditional WOLED panels which use a white subpixel to boost brightness at the cost of color volume."
      ],
      manufacturingProcess: [
          { step: "TFT Backplane", detail: "Thin-Film Transistors are deposited onto a glass substrate. This acts as the electrical switching grid that controls each individual pixel." },
          { step: "Organic Deposition (OLED)", detail: "Organic materials are evaporated in a vacuum chamber and deposited onto the backplane through a Fine Metal Mask (FMM) to create the subpixels." },
          { step: "Encapsulation", detail: "OLED material degrades instantly upon contact with oxygen or moisture. Thin-Film Encapsulation (TFE) seals the organic layers hermetically." },
          { step: "Module Bonding", detail: "The display panel is bonded to the driver ICs (COF - Chip on Film) and the T-Con board. The polarizing layers and anti-glare coatings are applied." },
          { step: "Color Calibration", detail: "Each panel is individually measured by a colorimeter at the factory. Look-Up Tables (LUTs) are flashed to the firmware to ensure color accuracy (Delta E < 2)." }
      ],
      techSpecs: [
          { key: "Panel", val: "OLED / IPS / VA" },
          { key: "Resolution", val: "4K / 1440p" },
          { key: "VRR", val: "G-Sync / FreeSync" },
          { key: "Color", val: "DCI-P3 Coverage" }
      ],
      marketModels: [
          {
              id: 1001, name: "Alienware AW3423DWF", brand: "Alienware", description: "QD-OLED Ultrawide immersion.",
              specs: { "Res": "3440x1440", "Hz": "165Hz", "Panel": "QD-OLED", "Response": "0.1ms" }
          },
          {
              id: 1002, name: "LG 27GR95QE", brand: "LG", description: "Fastest 1440p OLED.",
              specs: { "Res": "2560x1440", "Hz": "240Hz", "Panel": "WOLED", "Response": "0.03ms" }
          },
          {
              id: 1003, name: "Samsung Odyssey Neo G9", brand: "Samsung", description: "57-inch Dual UHD madness.",
              specs: { "Res": "7680x2160", "Hz": "240Hz", "Panel": "Mini-LED", "Response": "1ms" }
          },
          {
              id: 1004, name: "ASUS ROG Swift PG27AQDM", brand: "ASUS", description: "Brightest 1440p OLED.",
              specs: { "Res": "2560x1440", "Hz": "240Hz", "Panel": "WOLED", "Response": "0.03ms" }
          },
          {
              id: 1005, name: "Gigabyte M27Q X", brand: "Gigabyte", description: "Budget IPS King.",
              specs: { "Res": "2560x1440", "Hz": "240Hz", "Panel": "IPS", "Response": "1ms" }
          },
          {
              id: 1006, name: "MSI MPG 271QRX", brand: "MSI", description: "New Gen QD-OLED Panel.",
              specs: { "Res": "2560x1440", "Hz": "360Hz", "Panel": "QD-OLED", "Response": "0.03ms" }
          },
          {
              id: 1007, name: "Corsair Xeneon Flex", brand: "Corsair", description: "Bendable OLED display.",
              specs: { "Res": "3440x1440", "Hz": "240Hz", "Panel": "W-OLED", "Response": "0.03ms" }
          }
      ]
  }
};

export const CATEGORIES = ["cpu", "gpu", "motherboard", "ram", "storage", "psu", "casing", "cooling", "fans", "monitor"];
