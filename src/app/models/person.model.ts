export type Person = {
  id: number;
  name: string;
  pii: Record<string, string[]>;
  dataSources: {
    documents: string[];
    databases: string[];
    emails: string[];
    chats: string[];
  };
}
