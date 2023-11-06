export type QueryResult<T> = {
  rows: T[];
}

interface IDatabase {
  query: (queryString: string) => Promise<QueryResult<any>>;
}

export default IDatabase