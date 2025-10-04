import { type User, type InsertUser, type ForumDoubt, type InsertForumDoubt } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByGmail(gmail: string): Promise<User | undefined>;
  getUserByIdNumber(idNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Forum doubts
  createForumDoubt(doubt: InsertForumDoubt): Promise<ForumDoubt>;
  getForumDoubtsByCommittee(committeeName: string): Promise<ForumDoubt[]>;
  getForumDoubtsByUser(userId: string): Promise<ForumDoubt[]>;
  updateForumDoubt(id: string, updates: Partial<ForumDoubt>): Promise<ForumDoubt | undefined>;
  getAllForumDoubts(): Promise<ForumDoubt[]>;
}

export class MemStorage implements IStorage {
  private usersFilePath: string;
  private doubtsFilePath: string;
  private writeQueue: Promise<any> = Promise.resolve();
  private initialized: Promise<void>;

  constructor() {
    this.usersFilePath = path.join(process.cwd(), "data", "users.json");
    this.doubtsFilePath = path.join(process.cwd(), "data", "forumDoubts.json");
    this.initialized = this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      
      try {
        await fs.access(this.usersFilePath);
        const content = await fs.readFile(this.usersFilePath, "utf-8");
        JSON.parse(content);
      } catch (error) {
        await this.seedUsers();
      }
      
      try {
        await fs.access(this.doubtsFilePath);
        const content = await fs.readFile(this.doubtsFilePath, "utf-8");
        JSON.parse(content);
      } catch (error) {
        try {
          const content = await fs.readFile(this.doubtsFilePath, "utf-8");
          if (content && content.trim() !== "") {
            const backupPath = `${this.doubtsFilePath}.backup-${Date.now()}`;
            await fs.writeFile(backupPath, content, "utf-8");
            console.error(`Corrupted JSON file backed up to ${backupPath}`);
          }
        } catch {}
        await fs.writeFile(this.doubtsFilePath, "[]", "utf-8");
      }
    } catch (error) {
      console.error("Failed to initialize storage:", error);
      throw error;
    }
  }

  private async readUsersFromFile(): Promise<User[]> {
    await this.initialized;
    try {
      const data = await fs.readFile(this.usersFilePath, "utf-8");
      const users = JSON.parse(data);
      return users;
    } catch (error) {
      console.error("Failed to read users from file:", error);
      return [];
    }
  }

  private async writeUsersToFileInternal(users: User[]): Promise<void> {
    try {
      const tempPath = `${this.usersFilePath}.tmp`;
      await fs.writeFile(tempPath, JSON.stringify(users, null, 2), "utf-8");
      await fs.rename(tempPath, this.usersFilePath);
    } catch (error) {
      console.error("Failed to write users to file:", error);
      throw error;
    }
  }

  private async readDoubtsFromFile(): Promise<ForumDoubt[]> {
    await this.initialized;
    try {
      const data = await fs.readFile(this.doubtsFilePath, "utf-8");
      const doubts = JSON.parse(data);
      return doubts.map((doubt: any) => ({
        ...doubt,
        createdAt: new Date(doubt.createdAt),
      }));
    } catch (error) {
      console.error("Failed to read doubts from file:", error);
      try {
        const content = await fs.readFile(this.doubtsFilePath, "utf-8");
        if (content && content.trim() !== "") {
          const backupPath = `${this.doubtsFilePath}.backup-${Date.now()}`;
          await fs.writeFile(backupPath, content, "utf-8");
          console.error(`Corrupted JSON file backed up to ${backupPath}`);
        }
      } catch {}
      return [];
    }
  }

  private async seedUsers() {
    const extractCommittee = (preference: string): string => {
      if (!preference) return "General";
      if (preference.includes("CTC")) return "CTC";
      if (preference.includes("UNOOSA")) return "UNOOSA";
      if (preference.includes("SDG 5")) return "SDG 5";
      if (preference.includes("ECOFIN")) return "ECOFIN";
      if (preference.includes("UNSC")) return "UNSC";
      if (preference.includes("ICJ")) return "ICJ";
      if (preference.includes("AIPPM")) return "AIPPM";
      if (preference.includes("HCC")) return "HCC";
      if (preference.includes("IP:") || preference.includes("International Press")) return "IP";
      if (preference.includes("IPL")) return "IPL";
      if (preference.includes("FIFA")) return "FIFA";
      if (preference.includes("Disney")) return "Disney";
      if (preference.includes("Harry Potter")) return "Harry Potter";
      return "General";
    };

    const placeholderUsers: InsertUser[] = [
      {
        idNumber: "DYMUN001",
        gmail: "ekonkaarg@gmail.com",
        password: "Ekam#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN002",
        gmail: "brownrockdove@gmail.com",
        password: "Aradhya#MUN2025",
        committee: "ECOFIN",
        institution: "Podar International Nerul"
      },
      {
        idNumber: "DYMUN003",
        gmail: "rodrigues.renee21@gmail.com",
        password: "Renee#2025MUN",
        committee: "UNOOSA",
        institution: "Don Bosco Senior Secondary School Nerul"
      },
      {
        idNumber: "DYMUN004",
        gmail: "aayushideotarse@gmail.com",
        password: "Aayushi#MUN2025",
        committee: "AIPPM",
        institution: "Don Bosco Senior Secondary Nerul"
      },
      {
        idNumber: "DYMUN005",
        gmail: "abinsibin63@gmail.com",
        password: "Abin#2025MUN",
        committee: "HCC",
        institution: "Don Bosco School Nerul"
      },
      {
        idNumber: "DYMUN006",
        gmail: "2027mehulharish@dypisnerul.in",
        password: "Mehul#MUN2025",
        committee: "ICJ",
        institution: "DY Patil Nerul"
      },
      {
        idNumber: "DYMUN007",
        gmail: "faaizaf0011@gmail.com",
        password: "Faaiza#2025MUN",
        committee: "ICJ",
        institution: "New Horizon Public School"
      },
      {
        idNumber: "DYMUN008",
        gmail: "kimayashitkar2009@gmail.com",
        password: "Kimaya#MUN2025",
        committee: "AIPPM",
        institution: "Don Bosco Senior Secondary School"
      },
      {
        idNumber: "DYMUN009",
        gmail: "indirarichmariam@gmail.com",
        password: "Indira#2025MUN",
        committee: "IP",
        institution: "Don Bosco Nerul"
      },
      {
        idNumber: "DYMUN010",
        gmail: "ferdinamaeybinu@gmail.com",
        password: "Ferdin#MUN2025",
        committee: "IP",
        institution: "PM Shri KV Mankhurd"
      },
      {
        idNumber: "DYMUN011",
        gmail: "bhattiharnoorkaur@gmail.com",
        password: "Harnoor#2025MUN",
        committee: "UNSC",
        institution: "New Horizon Public School"
      },
      {
        idNumber: "DYMUN012",
        gmail: "vedikasarjine810@gmail.com",
        password: "Vedika#MUN2025",
        committee: "IP",
        institution: "Don Bosco Senior Secondary School"
      },
      {
        idNumber: "DYMUN013",
        gmail: "pdash7370@gmail.com",
        password: "Priyanshi#MUN2025",
        committee: "IP",
        institution: "Don Bosco Senior Secondary School"
      },
      {
        idNumber: "DYMUN014",
        gmail: "miyukistar23@gmail.com",
        password: "Janhavi#MUN2025",
        committee: "IP",
        institution: "Don Bosco Senior Secondary School Nerul"
      },
      {
        idNumber: "DYMUN015",
        gmail: "ananyatimestuffpass2011@gmail.com",
        password: "Ananya#2025MUN",
        committee: "AIPPM",
        institution: "Don Bosco Senior Secondary School"
      },
      {
        idNumber: "DYMUN016",
        gmail: "shobhaspanaskar@gmail.com",
        password: "Devansh#MUN2025",
        committee: "FIFA",
        institution: "Don Bosco Senior Secondary School, Nerul"
      },
      {
        idNumber: "DYMUN017",
        gmail: "adlineshybu7@gmail.com",
        password: "Adline#2025MUN",
        committee: "SDG 5",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN018",
        gmail: "Zainbasha24@gmail.com",
        password: "Shiza#MUN2025",
        committee: "ECOFIN",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN019",
        gmail: "siennajacob09@gmail.com",
        password: "Sienna#2025MUN",
        committee: "ECOFIN",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN020",
        gmail: "nafeesaahdawre@gmail.com",
        password: "Nafeesa#MUN2025",
        committee: "ECOFIN",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN021",
        gmail: "zikrasayed3667@gmail.com",
        password: "Zikra#2025MUN",
        committee: "ICJ",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN022",
        gmail: "aayush.dinesh2009@gmail.com",
        password: "Aayush#MUN2025",
        committee: "ICJ",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN023",
        gmail: "raafey27@gmail.com",
        password: "Raafe#2025MUN",
        committee: "CTC",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN024",
        gmail: "tanviaayre@gmail.com",
        password: "Tanvi#MUN2025",
        committee: "ICJ",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN025",
        gmail: "priyankaboney79@gmail.com",
        password: "Priyanka#MUN2025",
        committee: "CTC",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN026",
        gmail: "ayeshaipawne@gmail.com",
        password: "Ayesha#MUN2025",
        committee: "HCC",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN027",
        gmail: "rishavtoppo69@gmail.com",
        password: "Rishav#2025MUN",
        committee: "HCC",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN028",
        gmail: "Sharmacaptain9@gmail.com",
        password: "Ivan#2025MUN",
        committee: "HCC",
        institution: "Amity International School"
      },
      {
        idNumber: "DYMUN029",
        gmail: "lakshya.jindel@ais.amity.edu",
        password: "Lakshya#MUN2025",
        committee: "ECOFIN",
        institution: "Amity International School Belapur"
      },
      {
        idNumber: "DYMUN030",
        gmail: "yahyashaikh1211@gmail.com",
        password: "Yahya#2025MUN",
        committee: "UNSC",
        institution: "Presentation Convent School"
      },
      {
        idNumber: "DYMUN031",
        gmail: "akshitarosalia.gregory@ais.amity.edu",
        password: "Akshita#2025MUN",
        committee: "ICJ",
        institution: "Amity International School, Navi Mumbai"
      },
      {
        idNumber: "DYMUN032",
        gmail: "2032hussain.d@dypisnerul.in",
        password: "Hussain#2025MUN",
        committee: "SDG 5",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN033",
        gmail: "Kysha.bansal@gmail.com",
        password: "Kysha#2025MUN",
        committee: "Disney",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN034",
        gmail: "2031shripada.m@dypisnerul.in",
        password: "Shripada#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN035",
        gmail: "2033sarvesha.k@dypisnerul.in",
        password: "Sarvesha#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN036",
        gmail: "2033pratyushaa.m@dypisnerul.in",
        password: "Pratyushaa#2025MUN",
        committee: "Disney",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN037",
        gmail: "2034misheeta.c@dypisnerul.in",
        password: "Misheeta#2025MUN",
        committee: "Disney",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN038",
        gmail: "patelheer1133@gmail.com",
        password: "Heer#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN039",
        gmail: "2033prishaa.d@dypisnerul.in",
        password: "Prishaa#2025MUN",
        committee: "Disney",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN040",
        gmail: "2028akshara.p@dypisnerul.in",
        password: "Akshara#2025MUN",
        committee: "AIPPM",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN041",
        gmail: "2035anaysha.p@dypisnerul.in",
        password: "Anaysha#2025MUN",
        committee: "Disney",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN042",
        gmail: "2033mishay.s@dypisnerul.in",
        password: "Mishay#2025MUN",
        committee: "FIFA",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN043",
        gmail: "2033hiya.t@dypisnerul.in",
        password: "Hiya#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN044",
        gmail: "2033ansh.p@dypisnerul.in",
        password: "Ansh#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN045",
        gmail: "merohi@gmail.com",
        password: "Riddhi#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN046",
        gmail: "2033shreyansh.p@dypisnerul.in",
        password: "Shreyansh#2025MUN",
        committee: "FIFA",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN047",
        gmail: "2034mohd.u@dypisnerul.in",
        password: "Umair#2025MUN",
        committee: "Harry Potter",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN048",
        gmail: "2030siddh.m@dypisnerul.in",
        password: "Siddh#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN049",
        gmail: "2030saavi.d@dypisnerul.in",
        password: "Saavi#2025MUN",
        committee: "SDG 5",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN050",
        gmail: "2032jas.s@dypisnerul.in",
        password: "Jas#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN051",
        gmail: "omnakade19@gmail.com",
        password: "Om#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN052",
        gmail: "2029saanvi.j@dypisnerul.in",
        password: "Saanvi#2025MUN",
        committee: "HCC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN053",
        gmail: "2027mrunmayee.r@dypisnerul.in",
        password: "Mrunmayee#2025MUN",
        committee: "HCC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN054",
        gmail: "2029ved.s@dypisnerul.in",
        password: "Ved#2025MUN",
        committee: "HCC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN055",
        gmail: "2027saksham.a@dypisnerul.in",
        password: "Saksham#2025MUN",
        committee: "ICJ",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN056",
        gmail: "2030aaryaa.i@dypisnerul.in",
        password: "Aaryaa#2025MUN",
        committee: "SDG 5",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN057",
        gmail: "2027aditya.k@dypisnerul.in",
        password: "Aditya#2025MUN",
        committee: "ICJ",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN058",
        gmail: "2028lavanya.s@dypisnerul.in",
        password: "Lavanya#2025MUN",
        committee: "IP",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN059",
        gmail: "2029aarav.s@dypisnerul.in",
        password: "Aarav#2025MUN",
        committee: "AIPPM",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN060",
        gmail: "aksharadalan@gmail.com",
        password: "AksharaD#2025MUN",
        committee: "ECOFIN",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN061",
        gmail: "avyaysiyer@gmail.com",
        password: "Avyay#2025MUN",
        committee: "UNOOSA",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN062",
        gmail: "2032arjun.k@dypisnerul.in",
        password: "Arjun#2025MUN",
        committee: "CTC",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN063",
        gmail: "2027veer.p@gmail.com",
        password: "Veer#2025MUN",
        committee: "ICJ",
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN064",
        gmail: "hrehaan.vora@bombayscottish.in",
        password: "Hrehaan#2025MUN",
        committee: extractCommittee("CTC(Counter-Terrorism Committee):Deliberating Strategies to Disrupt Terrorist Financing Networks and Curb the Use of Illicit Financial Channels"),
        institution: "Bombay Scottish School Mahim(BSSM)"
      },
      {
        idNumber: "DYMUN065",
        gmail: "nmadhiwalla@gmail.com",
        password: "Vidhi#2025MUN",
        committee: extractCommittee("UNOOSA(United Nations Office for Outer Space Affairs): Global Framework to Prevent the Weaponization of Space-Based Technologies and Aggressive Militarization"),
        institution: "Don Bosco"
      },
      {
        idNumber: "DYMUN066",
        gmail: "nadarmahalakshmi15@gmail.com",
        password: "Mahalakshmi#2025MUN",
        committee: extractCommittee("ICJ (International Court of Justice): Application of the Convention on the Prevention and Punishment of the Crime and Genocide in Sudan (Sudan vs United Arab Emirates)"),
        institution: "DON BOSCO, Navi Mumbai, Nerul"
      },
      {
        idNumber: "DYMUN067",
        gmail: "ayush.dhingra@bombayscottish.in",
        password: "Ayush#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Bombay Scottish School Mahim"
      },
      {
        idNumber: "DYMUN068",
        gmail: "kritika.dhanda@bombayscottish.in",
        password: "Kritika#2025MUN",
        committee: extractCommittee("ICJ (International Court of Justice): Application of the Convention on the Prevention and Punishment of the Crime and Genocide in Sudan (Sudan vs United Arab Emirates)"),
        institution: "Bombay Scottish School Mahim"
      },
      {
        idNumber: "DYMUN069",
        gmail: "adityadalal542@gmail.com",
        password: "Aditya#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Fr agnel"
      },
      {
        idNumber: "DYMUN070",
        gmail: "jaykulkarni1811@gmail.com",
        password: "Jay#2025MUN",
        committee: extractCommittee("UNOOSA(United Nations Office for Outer Space Affairs): Global Framework to Prevent the Weaponization of Space-Based Technologies and Aggressive Militarization"),
        institution: "Don bosco senior secondary school,nerul(navi mumbai)"
      },
      {
        idNumber: "DYMUN071",
        gmail: "Anamika.singh@thyssenkrupp.com",
        password: "Aditya#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All."),
        institution: "NA"
      },
      {
        idNumber: "DYMUN072",
        gmail: "bhargavkavali.b@gmail.com",
        password: "Bhargav#2025MUN",
        committee: extractCommittee("ECOFIN(Economic and Financial Committee): Dollar Dominance: Deliberating on shifting towards a multi-currency system for trading."),
        institution: "Mahatma Junior College, New Panvel"
      },
      {
        idNumber: "DYMUN073",
        gmail: "Ses.b363601@gmail.com",
        password: "Anay#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Apeejay School, Nerul"
      },
      {
        idNumber: "DYMUN074",
        gmail: "lekha.vispute9@gmail.com",
        password: "Lekha#2025MUN",
        committee: extractCommittee("HCC (Historical Crisis Committee): Accountability for Nuclear Brinkmanship During the Cold War considering the Cuban Missile Crisis, Berlin standoffs, and general US-USSR nuclear threats. (Freeze date: February 15, 1989)"),
        institution: "Don Bosco Nerul"
      },
      {
        idNumber: "DYMUN075",
        gmail: "meezan2101@gmail.com",
        password: "Mohammad#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Presentation Convent School,Nerul"
      },
      {
        idNumber: "DYMUN076",
        gmail: "ipshitashriv25@gmail.com",
        password: "Ipshita#2025MUN",
        committee: extractCommittee("AIPPM(All India Political Party Meet): Deliberation on Enhancing Judicial Efficiency and Accountability in India whilst Balancing Legal Reform, Transparency, and Public Trust"),
        institution: "NHPS, Panvel"
      },
      {
        idNumber: "DYMUN077",
        gmail: "lakshyana21@gmail.com",
        password: "Laksh#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All."),
        institution: "Don bosco School Nerul,Navimumbai"
      },
      {
        idNumber: "DYMUN078",
        gmail: "dshah8143@gmail.com",
        password: "Dia#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Goldcrest International"
      },
      {
        idNumber: "DYMUN079",
        gmail: "pragyashaw19@gmail.com",
        password: "Pragya#2025MUN",
        committee: extractCommittee("ECOFIN(Economic and Financial Committee): Dollar Dominance: Deliberating on shifting towards a multi-currency system for trading."),
        institution: "Allen"
      },
      {
        idNumber: "DYMUN080",
        gmail: "seethal.sunnyk@gmail.com",
        password: "Esther#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All."),
        institution: "Don bosco senior secondry nerul"
      },
      {
        idNumber: "DYMUN081",
        gmail: "ssamriddhi944@gmail.com",
        password: "Samriddhi#2025MUN",
        committee: extractCommittee("AIPPM(All India Political Party Meet): Deliberation on Enhancing Judicial Efficiency and Accountability in India whilst Balancing Legal Reform, Transparency, and Public Trust"),
        institution: "Goldcrest High, Vashi"
      },
      {
        idNumber: "DYMUN082",
        gmail: "MANASVISKOLI@GMAIL.COM",
        password: "Manasvi#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All."),
        institution: "DON BOSCO SENIOR SECONDARY SCHOOL"
      },
      {
        idNumber: "DYMUN083",
        gmail: "aranrajroy7@gmail.com",
        password: "Aryanraj#2025MUN",
        committee: extractCommittee("IPL(Indian Premier League): Mega Auction"),
        institution: "Delhi Public School Panvel"
      },
      {
        idNumber: "DYMUN084",
        gmail: "mahit.c.nigam@gmail.com",
        password: "Mahit#2025MUN",
        committee: extractCommittee("UNSC(United Nations Security Council): Role of Non State Actors and Private Military Security Companies in Conflict Zones"),
        institution: "Goldcrest International"
      },
      {
        idNumber: "DYMUN085",
        gmail: "2029sarah.i@dypisnerul.in",
        password: "Sarah#2025MUN",
        committee: extractCommittee("ICJ (International Court of Justice): Application of the Convention on the Prevention and Punishment of the Crime and Genocide in Sudan (Sudan vs United Arab Emirates)"),
        institution: "D y patil international school"
      },
      {
        idNumber: "DYMUN086",
        gmail: "2030aryash.g@dypisnerul.in",
        password: "Aryash#2025MUN",
        committee: extractCommittee("IPL(Indian Premier League): Mega Auction"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN087",
        gmail: "2028rhea.m@dypisnerul.in",
        password: "Rhea#2025MUN",
        committee: extractCommittee("ECOFIN(Economic and Financial Committee): Dollar Dominance: Deliberating on shifting towards a multi-currency system for trading."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN088",
        gmail: "aviagarwal29@gmail.com",
        password: "Avi#2025MUN",
        committee: extractCommittee("SDG 5 (Sustainable Development Goal 5) - Gender Equality: Addressing gender-based disparities in Representation in Political Institutions and Decision-Making Processes."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN089",
        gmail: "2034kaira.a@dypisnerul.in",
        password: "Kaira#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN090",
        gmail: "2033adhiyajna.p@dypisnerul.in",
        password: "Adhiyajna#2025MUN",
        committee: extractCommittee("FIFA: Combating Discrimination and Social Inequality in Global Football."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN091",
        gmail: "2035aashritha.p@dypisnerul.in",
        password: "Aashritha#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN092",
        gmail: "2030amatullah.h@dypisnerul.in",
        password: "Amatullah#2025MUN",
        committee: extractCommittee("SDG 5 (Sustainable Development Goal 5) - Gender Equality: Addressing gender-based disparities in Representation in Political Institutions and Decision-Making Processes."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN093",
        gmail: "2034hriti.b@dypisnerul.in",
        password: "Hriti#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN094",
        gmail: "2034krupa.m@dypisnerul.in",
        password: "Krupa#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN095",
        gmail: "2035sanvika.p@dypisnerul.in",
        password: "Sanvika#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN096",
        gmail: "2035gaurishta.p@dypisnerul.in",
        password: "Gaurishta#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN097",
        gmail: "2033alaina.m@dypisnerul.in",
        password: "Alaina#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN098",
        gmail: "2030ayansh.g@gmail.com",
        password: "Ayansh#2025MUN",
        committee: extractCommittee("IPL(Indian Premier League): Mega Auction"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN099",
        gmail: "naishaamarahuja@gmail.com",
        password: "Naisha#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN100",
        gmail: "2033anaia.g@dypisnerul.in",
        password: "Anaia#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN101",
        gmail: "2031tanishka.b@dypisnerul.in",
        password: "Tanishka#2025MUN",
        committee: extractCommittee("SDG 5 (Sustainable Development Goal 5) - Gender Equality: Addressing gender-based disparities in Representation in Political Institutions and Decision-Making Processes."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN102",
        gmail: "2032naman.t@dypisnerul.in",
        password: "Naman#2025MUN",
        committee: extractCommittee("UNOOSA(United Nations Office for Outer Space Affairs): Global Framework to Prevent the Weaponization of Space-Based Technologies and Aggressive Militarization"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN103",
        gmail: "2034mira.s@dypisnerul.in",
        password: "Mira#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN104",
        gmail: "2035ananya.p@dypisnerul.in",
        password: "Ananya#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN105",
        gmail: "2033inaaya.a@dypisnerul.in",
        password: "Inaaya#2025MUN",
        committee: extractCommittee("Harry Potter: Rebuilding the Wizarding World in the Aftermath of the Battle of Hogwarts: Addressing Infrastructure, Governance, and Social Healing."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN106",
        gmail: "2034aavishi.g@dypisnerul.in",
        password: "Aavishi#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN107",
        gmail: "mindyourownbuissness321@gmail.com",
        password: "Zidan#2025MUN",
        committee: extractCommittee("CTC(Counter-Terrorism Committee):Deliberating Strategies to Disrupt Terrorist Financing Networks and Curb the Use of Illicit Financial Channels"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN108",
        gmail: "2031spruha.p@dypisnerul.in",
        password: "Spruha#2025MUN",
        committee: extractCommittee("UNOOSA(United Nations Office for Outer Space Affairs): Global Framework to Prevent the Weaponization of Space-Based Technologies and Aggressive Militarization"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN109",
        gmail: "2033meet.b@dypisnerul.in",
        password: "Meet#2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN110",
        gmail: "2032angelica.t@dypisnerul.in",
        password: "Angelica#2025MUN",
        committee: extractCommittee("SDG 5 (Sustainable Development Goal 5) - Gender Equality: Addressing gender-based disparities in Representation in Political Institutions and Decision-Making Processes."),
        institution: "D Y Patil International School, Nerul"
      },
      {
        idNumber: "DYMUN111",
        gmail: "2034alicia.s@dypisnerul.in",
        password: "Alicia2025MUN",
        committee: extractCommittee("Disney: Regulating the Use of Magic: Should Magical Abilities Be Governed by Law or Freely Practiced by All"),
        institution: "D Y Patil International School, Nerul"
      }
    ];

    const users: User[] = [];
    for (const userData of placeholderUsers) {
      const id = randomUUID();
      const user: User = { ...userData, password: userData.password, id };
      users.push(user);
    }
    await this.writeUsersToFileInternal(users);
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = await this.readUsersFromFile();
    return users.find(user => user.id === id);
  }

  async getUserByGmail(gmail: string): Promise<User | undefined> {
    const users = await this.readUsersFromFile();
    return users.find(user => user.gmail === gmail);
  }

  async getUserByIdNumber(idNumber: string): Promise<User | undefined> {
    const users = await this.readUsersFromFile();
    return users.find(user => user.idNumber === idNumber);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.initialized;
    const operation = async (): Promise<User> => {
      const users = await this.readUsersFromFile();
      const id = randomUUID();
      const user: User = { ...insertUser, password: insertUser.password, id };
      users.push(user);
      await this.writeUsersToFileInternal(users);
      return user;
    };
    this.writeQueue = this.writeQueue.then(operation, operation);
    return await this.writeQueue;
  }

  async createForumDoubt(insertDoubt: InsertForumDoubt): Promise<ForumDoubt> {
    await this.initialized;
    const operation = async (): Promise<ForumDoubt> => {
      const doubts = await this.readDoubtsFromFile();
      const id = randomUUID();
      const doubt: ForumDoubt = {
        ...insertDoubt,
        response: insertDoubt.response ?? null,
        isApproved: insertDoubt.isApproved ?? false,
        id,
        createdAt: new Date(),
      };
      doubts.push(doubt);
      await this.writeDoubtsToFileInternal(doubts);
      return doubt;
    };
    this.writeQueue = this.writeQueue.then(operation, operation);
    return await this.writeQueue;
  }

  private async writeDoubtsToFileInternal(doubts: ForumDoubt[]): Promise<void> {
    try {
      const tempPath = `${this.doubtsFilePath}.tmp`;
      await fs.writeFile(tempPath, JSON.stringify(doubts, null, 2), "utf-8");
      await fs.rename(tempPath, this.doubtsFilePath);
    } catch (error) {
      console.error("Failed to write doubts to file:", error);
      throw error;
    }
  }

  async getForumDoubtsByCommittee(committeeName: string): Promise<ForumDoubt[]> {
    const doubts = await this.readDoubtsFromFile();
    return doubts.filter((doubt) => doubt.committeeName === committeeName && doubt.isApproved);
  }

  async getForumDoubtsByUser(userId: string): Promise<ForumDoubt[]> {
    const doubts = await this.readDoubtsFromFile();
    return doubts.filter((doubt) => doubt.userId === userId);
  }

  async updateForumDoubt(id: string, updates: Partial<ForumDoubt>): Promise<ForumDoubt | undefined> {
    await this.initialized;
    const operation = async (): Promise<ForumDoubt | undefined> => {
      const doubts = await this.readDoubtsFromFile();
      const index = doubts.findIndex((doubt) => doubt.id === id);
      if (index === -1) return undefined;

      const updatedDoubt = { ...doubts[index], ...updates };
      doubts[index] = updatedDoubt;
      await this.writeDoubtsToFileInternal(doubts);
      return updatedDoubt;
    };
    this.writeQueue = this.writeQueue.then(operation, operation);
    return await this.writeQueue;
  }

  async getAllForumDoubts(): Promise<ForumDoubt[]> {
    return await this.readDoubtsFromFile();
  }
}

export const storage = new MemStorage();