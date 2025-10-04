import { type User, type InsertUser, type ForumDoubt, type InsertForumDoubt } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
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
  private users: Map<string, User>;
  private doubtsFilePath: string;
  private writeQueue: Promise<any> = Promise.resolve();
  private initialized: Promise<void>;

  constructor() {
    this.users = new Map();
    this.doubtsFilePath = path.join(process.cwd(), "data", "forumDoubts.json");
    this.seedUsers();
    this.initialized = this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      await fs.mkdir(path.dirname(this.doubtsFilePath), { recursive: true });
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
      }
    ];

    for (const userData of placeholderUsers) {
      await this.createUser(userData);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByGmail(gmail: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.gmail === gmail,
    );
  }

  async getUserByIdNumber(idNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.idNumber === idNumber,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { ...insertUser, password: hashedPassword, id };
    this.users.set(id, user);
    return user;
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