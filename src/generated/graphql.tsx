import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Bank = {
  __typename?: 'Bank';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 支店名 */
  branchName?: Maybe<Scalars['String']['output']>;
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 入金リスト */
  incomes: Array<Income>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払い方法 */
  payments: Array<Payment>;
};

export type BankBalance = {
  __typename?: 'BankBalance';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 銀行リレーション */
  bank: Bank;
  /** 出金データ */
  expenditureData: ExpenditureData;
  /** 入金データ */
  incomeData: IncomeData;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 出金リスト */
  expenditures: Array<Expenditure>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
};

export type CreateBankBalanceInput = {
  /** 銀行リレーション */
  bank: Scalars['String']['input'];
  /** 出金データ */
  expenditureData: ExpenditureDataInput;
  /** 入金データ */
  incomeData: IncomeDataInput;
};

export type CreateBankInput = {
  /** 支店名 */
  branchName: Scalars['String']['input'];
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
};

export type CreateExpenditureInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** カテゴリーリレーション */
  category?: InputMaybe<Scalars['String']['input']>;
  /** 説明・備考 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 固定費リレーション */
  fixedCost?: InputMaybe<Scalars['String']['input']>;
  /** ローンリレーション */
  loan?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 発生日 */
  occurrenceDay: Scalars['DateTime']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** SOPリレーション */
  sop?: InputMaybe<Scalars['String']['input']>;
  /** 月謝リレーション */
  subscriber?: InputMaybe<Scalars['String']['input']>;
  /** 税金リレーショナル */
  tax?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateFixedCostInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 固定費パターン */
  fixedCostPattern: Scalars['String']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払い方法 */
  payDay: Scalars['Int']['input'];
  /** 発生日 */
  payment: Scalars['String']['input'];
};

export type CreateFixedCostPatternInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
};

export type CreateIncomeInput = {
  /** 金額 */
  amount: Scalars['Int']['input'];
  /** 入金口座 */
  bank: Scalars['String']['input'];
  /** 入金日 */
  depositDate: Scalars['DateTime']['input'];
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateLoanInput = {
  /** 支払い総額 */
  amount: Scalars['Int']['input'];
  /** 借入金額 */
  basePrice: Scalars['Int']['input'];
  /** 分割回数 */
  installmentsCount: Scalars['Int']['input'];
  /** 利息 */
  interest: Scalars['Int']['input'];
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 年利 */
  rate: Scalars['Float']['input'];
  /** 開始日 */
  startDate: Scalars['DateTime']['input'];
};

export type CreateMonthlyDataInput = {
  /** バッファ率 */
  bufferRate: Scalars['Float']['input'];
  /** 固定費パターン */
  fixedCostPattern: Scalars['String']['input'];
  /** 月 */
  month: Scalars['Int']['input'];
  /** 貯蓄口座 */
  savingBank: Scalars['String']['input'];
  /** 貯蓄率 */
  savingRate: Scalars['Float']['input'];
  /** 年 */
  year: Scalars['Int']['input'];
};

export type CreatePaymentInput = {
  /** 引き落とし口座 */
  bank: Scalars['String']['input'];
  /** 締め日 */
  closingDay?: InputMaybe<Scalars['Int']['input']>;
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** クレジットかどうか */
  isCredit?: InputMaybe<Scalars['Boolean']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 引き落とし日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 編集不可フラグ */
  uneditable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateSopInput = {
  /** 基本支払い額 */
  basePrice: Scalars['Int']['input'];
  /** 終了日 */
  endDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 月額支払額 */
  prices: Array<Scalars['Int']['input']>;
};

export type CreateSubscriberInput = {
  /** 基本支払い額 */
  basePrice: Scalars['Int']['input'];
  /** 終了日 */
  endDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払日 */
  payDay: Scalars['Int']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
  /** 月額支払額 */
  prices: Array<Scalars['Int']['input']>;
};

export type CreateTaxInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name: Scalars['String']['input'];
  /** 支払い方法 */
  payment: Scalars['String']['input'];
};

export type Expenditure = {
  __typename?: 'Expenditure';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** カテゴリーリレーション */
  category?: Maybe<Category>;
  /** 説明・備考 */
  description?: Maybe<Scalars['String']['output']>;
  /** 重複回避ID */
  duplexingAvoidanceID?: Maybe<Scalars['String']['output']>;
  /** 固定費リレーション */
  fixedCost?: Maybe<FixedCost>;
  /** ローンリレーション */
  loan?: Maybe<Loan>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  occurrenceDay: Scalars['DateTime']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** SOPリレーション */
  sop?: Maybe<Sop>;
  /** 月謝リレーション */
  subscriber?: Maybe<Subscriber>;
  /** 税金リレーショナル */
  tax?: Maybe<Tax>;
  /** 仮・未確定フラグ */
  temporary?: Maybe<Scalars['Boolean']['output']>;
};

export type ExpenditureData = {
  __typename?: 'ExpenditureData';
  /** 先月までの出金総額 */
  beginningMonthExpenditure: Scalars['Int']['output'];
  /** 今月の出金総額 */
  nowMonthExpenditure: Scalars['Int']['output'];
  /** 今月の出入金総額 */
  temporaryNowMonthExpenditure: Scalars['Int']['output'];
};

export type ExpenditureDataInput = {
  /** 先月までの出金総額 */
  beginningMonthExpenditure: Scalars['Int']['input'];
  /** 今月の出金総額 */
  nowMonthExpenditure: Scalars['Int']['input'];
  /** 今月の出入金総額 */
  temporaryNowMonthExpenditure: Scalars['Int']['input'];
};

export type FixedCost = {
  __typename?: 'FixedCost';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** 固定費パターン */
  fixedCostPattern: FixedCostPattern;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 発生日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
};

export type FixedCostPattern = {
  __typename?: 'FixedCostPattern';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 固定費詳細 */
  fixedcosts?: Maybe<Array<FixedCost>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
};

export type Income = {
  __typename?: 'Income';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 金額 */
  amount: Scalars['Int']['output'];
  /** 入金口座 */
  bank: Bank;
  /** 入金日 */
  depositDate: Scalars['DateTime']['output'];
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 仮・未確定フラグ */
  temporary?: Maybe<Scalars['Boolean']['output']>;
};

export type IncomeData = {
  __typename?: 'IncomeData';
  /** 先月までの入金総額 */
  beginningMonthIncome: Scalars['Int']['output'];
  /** 今月の入金総額 */
  nowMonthIncome: Scalars['Int']['output'];
  /** 今月の仮入金総額 */
  temporaryNowMonthIncome: Scalars['Int']['output'];
};

export type IncomeDataInput = {
  /** 先月までの入金総額 */
  beginningMonthIncome: Scalars['Int']['input'];
  /** 今月の入金総額 */
  nowMonthIncome: Scalars['Int']['input'];
  /** 今月の仮入金総額 */
  temporaryNowMonthIncome: Scalars['Int']['input'];
};

export type Loan = {
  __typename?: 'Loan';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 支払い総額 */
  amount: Scalars['Int']['output'];
  /** 借入金額 */
  basePrice: Scalars['Int']['output'];
  /** 出金リレーション・分割ごとの支払額 */
  expenditures?: Maybe<Array<Expenditure>>;
  /** 分割回数 */
  installmentsCount: Scalars['Int']['output'];
  /** 利息 */
  interest: Scalars['Int']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 年利 */
  rate: Scalars['Float']['output'];
  /** 開始日 */
  startDate: Scalars['DateTime']['output'];
};

export type MonthlyData = {
  __typename?: 'MonthlyData';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 今月の残高データ */
  bankBalances: Array<BankBalance>;
  /** 今月の利益 */
  benefit: Scalars['Int']['output'];
  /** 今月の利益（仮） */
  benefitTemporary: Scalars['Int']['output'];
  /** バッファ金額 */
  buffer: Scalars['Int']['output'];
  /** バッファ率 */
  bufferRate: Scalars['Float']['output'];
  /** 今月の出金リスト */
  expenditures: Array<Expenditure>;
  /** 固定費パターン */
  fixedCostPattern: FixedCostPattern;
  /** 今月の入金リスト */
  incomes: Array<Income>;
  /** 月 */
  month: Scalars['Int']['output'];
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 貯蓄口座 */
  savingBank: Bank;
  /** 貯蓄率 */
  savingRate: Scalars['Float']['output'];
  /** 今月の貯蓄額 */
  savings: Scalars['Int']['output'];
  /** 今月の出金総額 */
  sumExpenditure: Scalars['Int']['output'];
  /** 今月の出金総額（仮） */
  sumExpenditureTemporary: Scalars['Int']['output'];
  /** 今月の入金総額 */
  sumIncome: Scalars['Int']['output'];
  /** 今月の入金総額（仮） */
  sumIncomeTemporary: Scalars['Int']['output'];
  /** 年 */
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBank: MutationSuccessResGraphQl;
  createCategory: MutationSuccessResGraphQl;
  createExpenditure: MutationSuccessResGraphQl;
  createFixedCost: MutationSuccessResGraphQl;
  createFixedCostPattern: MutationSuccessResGraphQl;
  createIncome: MutationSuccessResGraphQl;
  createLoan: MutationSuccessResGraphQl;
  createManyExpenditures: MutationSuccessResGraphQl;
  createMonthlyData: MutationSuccessResGraphQl;
  createPayment: MutationSuccessResGraphQl;
  createSop: MutationSuccessResGraphQl;
  createSubscriber: MutationSuccessResGraphQl;
  createTax: MutationSuccessResGraphQl;
  deleteBank: MutationSuccessResGraphQl;
  deleteCategory: MutationSuccessResGraphQl;
  deleteExpenditure: MutationSuccessResGraphQl;
  deleteFixedCost: MutationSuccessResGraphQl;
  deleteFixedCostPattern: MutationSuccessResGraphQl;
  deleteIncome: MutationSuccessResGraphQl;
  deleteLoan: MutationSuccessResGraphQl;
  deleteManyExpenditures: MutationSuccessResGraphQl;
  deleteMonthlyData: MutationSuccessResGraphQl;
  deletePayment: MutationSuccessResGraphQl;
  deleteSop: MutationSuccessResGraphQl;
  deleteSubscriber: MutationSuccessResGraphQl;
  deleteTax: MutationSuccessResGraphQl;
  updateBank: MutationSuccessResGraphQl;
  updateCategory: MutationSuccessResGraphQl;
  updateExpenditure: MutationSuccessResGraphQl;
  updateFixedCost: MutationSuccessResGraphQl;
  updateFixedCostPattern: MutationSuccessResGraphQl;
  updateIncome: MutationSuccessResGraphQl;
  updateLoan: MutationSuccessResGraphQl;
  updateMonthlyData: MutationSuccessResGraphQl;
  updatePayment: MutationSuccessResGraphQl;
  updateSop: MutationSuccessResGraphQl;
  updateSubscriber: MutationSuccessResGraphQl;
  updateTax: MutationSuccessResGraphQl;
};


export type MutationCreateBankArgs = {
  input: CreateBankInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateExpenditureArgs = {
  input: CreateExpenditureInput;
};


export type MutationCreateFixedCostArgs = {
  input: CreateFixedCostInput;
};


export type MutationCreateFixedCostPatternArgs = {
  input: CreateFixedCostPatternInput;
};


export type MutationCreateIncomeArgs = {
  input: CreateIncomeInput;
};


export type MutationCreateLoanArgs = {
  input: CreateLoanInput;
};


export type MutationCreateManyExpendituresArgs = {
  inputs: Array<CreateExpenditureInput>;
};


export type MutationCreateMonthlyDataArgs = {
  input: CreateMonthlyDataInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateSopArgs = {
  input: CreateSopInput;
};


export type MutationCreateSubscriberArgs = {
  input: CreateSubscriberInput;
};


export type MutationCreateTaxArgs = {
  input: CreateTaxInput;
};


export type MutationDeleteBankArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExpenditureArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFixedCostArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFixedCostPatternArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteIncomeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLoanArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteManyExpendituresArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationDeleteMonthlyDataArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSopArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSubscriberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaxArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBankArgs = {
  id: Scalars['String']['input'];
  input: UpdateBankInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateExpenditureArgs = {
  id: Scalars['String']['input'];
  input: UpdateExpenditureInput;
};


export type MutationUpdateFixedCostArgs = {
  id: Scalars['String']['input'];
  input: UpdateFixedCostInput;
};


export type MutationUpdateFixedCostPatternArgs = {
  id: Scalars['String']['input'];
  input: UpdateFixedCostPatternInput;
};


export type MutationUpdateIncomeArgs = {
  id: Scalars['String']['input'];
  input: UpdateIncomeInput;
};


export type MutationUpdateLoanArgs = {
  id: Scalars['String']['input'];
  input: UpdateLoanInput;
};


export type MutationUpdateMonthlyDataArgs = {
  id: Scalars['String']['input'];
  input: UpdateMonthlyDataInput;
};


export type MutationUpdatePaymentArgs = {
  id: Scalars['String']['input'];
  input: UpdatePaymentInput;
};


export type MutationUpdateSopArgs = {
  id: Scalars['String']['input'];
  input: UpdateSopInput;
};


export type MutationUpdateSubscriberArgs = {
  id: Scalars['String']['input'];
  input: UpdateSubscriberInput;
};


export type MutationUpdateTaxArgs = {
  id: Scalars['String']['input'];
  input: UpdateTaxInput;
};

export type MutationSuccessResGraphQl = {
  __typename?: 'MutationSuccessResGraphQl';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 引き落とし口座 */
  bank: Bank;
  /** 締め日 */
  closingDay?: Maybe<Scalars['Int']['output']>;
  /** 設定カラー */
  color?: Maybe<Scalars['String']['output']>;
  /** 出金リスト */
  expenditures: Array<Expenditure>;
  /** クレジットかどうか */
  isCredit?: Maybe<Scalars['Boolean']['output']>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 引き落とし日 */
  payDay?: Maybe<Scalars['Int']['output']>;
  /** 編集不可フラグ */
  uneditable?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findAllBanks: Array<Bank>;
  findAllCategorys: Array<Category>;
  findAllExpenditures: Array<Expenditure>;
  findAllFixedCostPatterns: Array<FixedCostPattern>;
  findAllFixedCosts: Array<FixedCost>;
  findAllIncomes: Array<Income>;
  findAllLoans: Array<Loan>;
  findAllMonthlyDatas: Array<MonthlyData>;
  findAllPayments: Array<Payment>;
  findAllSops: Array<Sop>;
  findAllSubscribers: Array<Subscriber>;
  findAllTaxs: Array<Tax>;
  findBankByID: Bank;
  findCategoryByID: Category;
  findExpenditureByID: Expenditure;
  findFixedCostByID: FixedCost;
  findFixedCostPatternByID: FixedCostPattern;
  findIncomeByID: Income;
  findLoanByID: Loan;
  findMonthlyDataByID: MonthlyData;
  findPaymentByID: Payment;
  findSopByID: Sop;
  findSubscriberByID: Subscriber;
  findTaxByID: Tax;
};


export type QueryFindBankByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindExpenditureByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindFixedCostByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindFixedCostPatternByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindIncomeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindLoanByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindMonthlyDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPaymentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindSopByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindSubscriberByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindTaxByIdArgs = {
  id: Scalars['String']['input'];
};

export type Sop = {
  __typename?: 'Sop';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 基本支払い額 */
  basePrice: Scalars['Float']['output'];
  /** 終了日 */
  endDay: Scalars['DateTime']['output'];
  /** 出金リレーション・分割ごとの支払額 */
  expenditures?: Maybe<Array<Expenditure>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 月ごとの支払い額 */
  prices: Array<Scalars['Float']['output']>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 基本支払い額 */
  basePrice: Scalars['Float']['output'];
  /** 終了日 */
  endDay: Scalars['DateTime']['output'];
  /** 出金リレーション・分割ごとの支払額 */
  expenditures?: Maybe<Array<Expenditure>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払日 */
  payDay: Scalars['Int']['output'];
  /** 支払い方法 */
  payment: Payment;
  /** 月ごとの支払い額 */
  prices: Array<Scalars['Float']['output']>;
};

export type Tax = {
  __typename?: 'Tax';
  /** MongoDB Id */
  _id: Scalars['ID']['output'];
  /** 説明 */
  description: Scalars['String']['output'];
  /** 出金リレーション */
  expenditures?: Maybe<Array<Expenditure>>;
  /** MongoDB Collection Name。アイテム名 */
  name: Scalars['String']['output'];
  /** 支払い方法 */
  payment: Payment;
};

export type UpdateBankInput = {
  /** 支店名 */
  branchName?: InputMaybe<Scalars['String']['input']>;
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 入金リスト */
  incomes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payments?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateCategoryInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenditureInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** カテゴリーリレーション */
  category?: InputMaybe<Scalars['String']['input']>;
  /** 説明・備考 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 重複回避ID */
  duplexingAvoidanceID?: InputMaybe<Scalars['String']['input']>;
  /** 固定費リレーション */
  fixedCost?: InputMaybe<Scalars['String']['input']>;
  /** ローンリレーション */
  loan?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 発生日 */
  occurrenceDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** SOPリレーション */
  sop?: InputMaybe<Scalars['String']['input']>;
  /** 月謝リレーション */
  subscriber?: InputMaybe<Scalars['String']['input']>;
  /** 税金リレーショナル */
  tax?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateFixedCostInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 固定費パターン */
  fixedCostPattern?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 発生日 */
  payment?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFixedCostPatternInput = {
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 固定費詳細 */
  fixedcosts?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIncomeInput = {
  /** 金額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 入金口座 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 入金日 */
  depositDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 仮・未確定フラグ */
  temporary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateLoanInput = {
  /** 支払い総額 */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** 借入金額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** 出金リレーション・分割ごとの支払額 */
  expenditures?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 分割回数 */
  installmentsCount?: InputMaybe<Scalars['Int']['input']>;
  /** 利息 */
  interest?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 年利 */
  rate?: InputMaybe<Scalars['Float']['input']>;
  /** 開始日 */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateMonthlyDataInput = {
  /** 今月の残高データ */
  bankBalances?: InputMaybe<Array<CreateBankBalanceInput>>;
  /** 今月の利益 */
  benefit?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の利益（仮） */
  benefitTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** バッファ金額 */
  buffer?: InputMaybe<Scalars['Int']['input']>;
  /** バッファ率 */
  bufferRate?: InputMaybe<Scalars['Float']['input']>;
  /** 今月の出金リスト */
  expenditures?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 固定費パターン */
  fixedCostPattern?: InputMaybe<Scalars['String']['input']>;
  /** 今月の入金リスト */
  incomes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 月 */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** アイテム名・ここでは使わない */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 貯蓄口座 */
  savingBank?: InputMaybe<Scalars['String']['input']>;
  /** 貯蓄率 */
  savingRate?: InputMaybe<Scalars['Float']['input']>;
  /** 今月の貯蓄額 */
  savings?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の出金総額 */
  sumExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の出金総額（仮） */
  sumExpenditureTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の入金総額 */
  sumIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 今月の入金総額（仮） */
  sumIncomeTemporary?: InputMaybe<Scalars['Int']['input']>;
  /** 年 */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePaymentInput = {
  /** 引き落とし口座 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 締め日 */
  closingDay?: InputMaybe<Scalars['Int']['input']>;
  /** 設定カラー */
  color?: InputMaybe<Scalars['String']['input']>;
  /** クレジットかどうか */
  isCredit?: InputMaybe<Scalars['Boolean']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 引き落とし日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 編集不可フラグ */
  uneditable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSopInput = {
  /** 基本支払い額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** 終了日 */
  endDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 月額支払額 */
  prices?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateSubscriberInput = {
  /** 基本支払い額 */
  basePrice?: InputMaybe<Scalars['Int']['input']>;
  /** 終了日 */
  endDay?: InputMaybe<Scalars['DateTime']['input']>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払日 */
  payDay?: InputMaybe<Scalars['Int']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
  /** 月額支払額 */
  prices?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateTaxInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 出金リレーション */
  expenditures?: InputMaybe<Array<Scalars['String']['input']>>;
  /** アイテム名 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 支払い方法 */
  payment?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBankMutationVariables = Exact<{
  input: CreateBankInput;
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type CreateExpenditureMutationVariables = Exact<{
  input: CreateExpenditureInput;
}>;


export type CreateExpenditureMutation = { __typename?: 'Mutation', createExpenditure: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type CreateFixedCostMutationVariables = Exact<{
  input: CreateFixedCostInput;
}>;


export type CreateFixedCostMutation = { __typename?: 'Mutation', createFixedCost: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type CreateFixedCostPatternMutationVariables = Exact<{
  input: CreateFixedCostPatternInput;
}>;


export type CreateFixedCostPatternMutation = { __typename?: 'Mutation', createFixedCostPattern: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type CreateLoanMutationVariables = Exact<{
  input: CreateLoanInput;
}>;


export type CreateLoanMutation = { __typename?: 'Mutation', createLoan: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type CreateManyExpendituresMutationVariables = Exact<{
  inputs: Array<CreateExpenditureInput> | CreateExpenditureInput;
}>;


export type CreateManyExpendituresMutation = { __typename?: 'Mutation', createManyExpenditures: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type DeleteManyExpendituresMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteManyExpendituresMutation = { __typename?: 'Mutation', deleteManyExpenditures: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type FindAllBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllBanksQuery = { __typename?: 'Query', findAllBanks: Array<{ __typename?: 'Bank', _id: string, name: string, branchName?: string | null, color?: string | null, payments: Array<{ __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, uneditable?: boolean | null, expenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, payment: { __typename?: 'Payment', _id: string, name: string }, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null }> }>, incomes: Array<{ __typename?: 'Income', _id: string, amount: number, depositDate: any, description?: string | null, name: string, temporary?: boolean | null }> }> };

export type FindAllCategorysQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategorysQuery = { __typename?: 'Query', findAllCategorys: Array<{ __typename?: 'Category', _id: string, name: string, color?: string | null, expenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, payment: { __typename?: 'Payment', _id: string, name: string, isCredit?: boolean | null, payDay?: number | null, closingDay?: number | null, color?: string | null, uneditable?: boolean | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, color?: string | null, name: string } }, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null }> }> };

export type FindAllExpendituresQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllExpendituresQuery = { __typename?: 'Query', findAllExpenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, payment: { __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, bank: { __typename?: 'Bank', _id: string, color?: string | null, branchName?: string | null, name: string } }, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null, category?: { __typename?: 'Category', color?: string | null, name: string, _id: string } | null }> };

export type FindAllFixedCostPatternsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllFixedCostPatternsQuery = { __typename?: 'Query', findAllFixedCostPatterns: Array<{ __typename?: 'FixedCostPattern', _id: string, name: string, color?: string | null, fixedcosts?: Array<{ __typename?: 'FixedCost', _id: string, amount: number, description?: string | null, name: string, payDay: number, payment: { __typename?: 'Payment', _id: string, name: string } }> | null }> };

export type FindAllLoansQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllLoansQuery = { __typename?: 'Query', findAllLoans: Array<{ __typename?: 'Loan', _id: string, name: string, installmentsCount: number, payDay: number, basePrice: number, amount: number, interest: number, rate: number, startDate: any, payment: { __typename?: 'Payment', _id: string, color?: string | null, name: string, payDay?: number | null, isCredit?: boolean | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, color?: string | null, name: string } }, expenditures?: Array<{ __typename?: 'Expenditure', _id: string, amount: number, description?: string | null, duplexingAvoidanceID?: string | null, name: string, occurrenceDay: any, temporary?: boolean | null, payment: { __typename?: 'Payment', _id: string, name: string, payDay?: number | null }, category?: { __typename?: 'Category', color?: string | null, name: string, _id: string } | null }> | null }> };

export type FindAllPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllPaymentsQuery = { __typename?: 'Query', findAllPayments: Array<{ __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, uneditable?: boolean | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, name: string, color?: string | null }, expenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null, category?: { __typename?: 'Category', _id: string, name: string, color?: string | null } | null }> }> };

export type FindBankByIdQueryVariables = Exact<{
  findBankByIdId: Scalars['String']['input'];
}>;


export type FindBankByIdQuery = { __typename?: 'Query', findBankByID: { __typename?: 'Bank', _id: string, name: string, branchName?: string | null, color?: string | null, payments: Array<{ __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, uneditable?: boolean | null, expenditures: Array<{ __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, payment: { __typename?: 'Payment', _id: string, name: string }, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null }> }>, incomes: Array<{ __typename?: 'Income', _id: string, amount: number, depositDate: any, description?: string | null, name: string, temporary?: boolean | null }> } };

export type FindExpenditureByIdQueryVariables = Exact<{
  findExpenditureByIdId: Scalars['String']['input'];
}>;


export type FindExpenditureByIdQuery = { __typename?: 'Query', findExpenditureByID: { __typename?: 'Expenditure', _id: string, name: string, description?: string | null, amount: number, occurrenceDay: any, temporary?: boolean | null, duplexingAvoidanceID?: string | null, payment: { __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, bank: { __typename?: 'Bank', _id: string, color?: string | null, branchName?: string | null, name: string } }, tax?: { __typename?: 'Tax', _id: string, name: string } | null, loan?: { __typename?: 'Loan', _id: string, name: string } | null, fixedCost?: { __typename?: 'FixedCost', _id: string, name: string } | null, sop?: { __typename?: 'Sop', _id: string, name: string } | null, subscriber?: { __typename?: 'Subscriber', _id: string, name: string } | null, category?: { __typename?: 'Category', color?: string | null, name: string, _id: string } | null } };

export type FindFixedCostByIdQueryVariables = Exact<{
  findFixedCostByIdId: Scalars['String']['input'];
}>;


export type FindFixedCostByIdQuery = { __typename?: 'Query', findFixedCostByID: { __typename?: 'FixedCost', _id: string, name: string, description?: string | null, amount: number, payDay: number, payment: { __typename?: 'Payment', name: string, color?: string | null, _id: string, bank: { __typename?: 'Bank', branchName?: string | null, name: string, color?: string | null, _id: string } }, fixedCostPattern: { __typename?: 'FixedCostPattern', _id: string, color?: string | null, name: string } } };

export type FindFixedCostPatternByIdQueryVariables = Exact<{
  findFixedCostPatternByIdId: Scalars['String']['input'];
}>;


export type FindFixedCostPatternByIdQuery = { __typename?: 'Query', findFixedCostPatternByID: { __typename?: 'FixedCostPattern', _id: string, name: string, color?: string | null, fixedcosts?: Array<{ __typename?: 'FixedCost', _id: string, amount: number, description?: string | null, name: string, payDay: number, payment: { __typename?: 'Payment', _id: string, name: string } }> | null } };

export type FindLoanByIdQueryVariables = Exact<{
  findLoanByIdId: Scalars['String']['input'];
}>;


export type FindLoanByIdQuery = { __typename?: 'Query', findLoanByID: { __typename?: 'Loan', _id: string, name: string, installmentsCount: number, payDay: number, basePrice: number, amount: number, interest: number, rate: number, startDate: any, payment: { __typename?: 'Payment', _id: string, color?: string | null, name: string, payDay?: number | null, isCredit?: boolean | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, color?: string | null, name: string } }, expenditures?: Array<{ __typename?: 'Expenditure', _id: string, amount: number, description?: string | null, duplexingAvoidanceID?: string | null, name: string, occurrenceDay: any, temporary?: boolean | null, payment: { __typename?: 'Payment', _id: string, name: string, payDay?: number | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, color?: string | null, name: string } }, category?: { __typename?: 'Category', color?: string | null, name: string, _id: string } | null }> | null } };

export type FindPaymentByIdQueryVariables = Exact<{
  findPaymentByIdId: Scalars['String']['input'];
}>;


export type FindPaymentByIdQuery = { __typename?: 'Query', findPaymentByID: { __typename?: 'Payment', _id: string, closingDay?: number | null, color?: string | null, isCredit?: boolean | null, name: string, payDay?: number | null, uneditable?: boolean | null, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, name: string, color?: string | null } } };

export type UpdateBankMutationVariables = Exact<{
  updateBankId: Scalars['String']['input'];
  input: UpdateBankInput;
}>;


export type UpdateBankMutation = { __typename?: 'Mutation', updateBank: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type UpdateExpenditureMutationVariables = Exact<{
  updateExpenditureId: Scalars['String']['input'];
  input: UpdateExpenditureInput;
}>;


export type UpdateExpenditureMutation = { __typename?: 'Mutation', updateExpenditure: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type UpdateFixedCostMutationVariables = Exact<{
  updateFixedCostId: Scalars['String']['input'];
  input: UpdateFixedCostInput;
}>;


export type UpdateFixedCostMutation = { __typename?: 'Mutation', updateFixedCost: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type UpdateFixedCostPatternMutationVariables = Exact<{
  updateFixedCostPatternId: Scalars['String']['input'];
  input: UpdateFixedCostPatternInput;
}>;


export type UpdateFixedCostPatternMutation = { __typename?: 'Mutation', updateFixedCostPattern: { __typename?: 'MutationSuccessResGraphQl', message: string, success: boolean } };

export type UpdateLoanMutationVariables = Exact<{
  updateLoanId: Scalars['String']['input'];
  input: UpdateLoanInput;
}>;


export type UpdateLoanMutation = { __typename?: 'Mutation', updateLoan: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };

export type UpdatePaymentMutationVariables = Exact<{
  updatePaymentId: Scalars['String']['input'];
  input: UpdatePaymentInput;
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', updatePayment: { __typename?: 'MutationSuccessResGraphQl', success: boolean, message: string } };


export const CreateBankDocument = gql`
    mutation CreateBank($input: CreateBankInput!) {
  createBank(input: $input) {
    success
    message
  }
}
    `;
export type CreateBankMutationFn = Apollo.MutationFunction<CreateBankMutation, CreateBankMutationVariables>;

/**
 * __useCreateBankMutation__
 *
 * To run a mutation, you first call `useCreateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBankMutation, { data, loading, error }] = useCreateBankMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateBankMutation, CreateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument, options);
      }
export type CreateBankMutationHookResult = ReturnType<typeof useCreateBankMutation>;
export type CreateBankMutationResult = Apollo.MutationResult<CreateBankMutation>;
export type CreateBankMutationOptions = Apollo.BaseMutationOptions<CreateBankMutation, CreateBankMutationVariables>;
export const CreateExpenditureDocument = gql`
    mutation CreateExpenditure($input: CreateExpenditureInput!) {
  createExpenditure(input: $input) {
    message
    success
  }
}
    `;
export type CreateExpenditureMutationFn = Apollo.MutationFunction<CreateExpenditureMutation, CreateExpenditureMutationVariables>;

/**
 * __useCreateExpenditureMutation__
 *
 * To run a mutation, you first call `useCreateExpenditureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenditureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenditureMutation, { data, loading, error }] = useCreateExpenditureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExpenditureMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenditureMutation, CreateExpenditureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenditureMutation, CreateExpenditureMutationVariables>(CreateExpenditureDocument, options);
      }
export type CreateExpenditureMutationHookResult = ReturnType<typeof useCreateExpenditureMutation>;
export type CreateExpenditureMutationResult = Apollo.MutationResult<CreateExpenditureMutation>;
export type CreateExpenditureMutationOptions = Apollo.BaseMutationOptions<CreateExpenditureMutation, CreateExpenditureMutationVariables>;
export const CreateFixedCostDocument = gql`
    mutation CreateFixedCost($input: CreateFixedCostInput!) {
  createFixedCost(input: $input) {
    message
    success
  }
}
    `;
export type CreateFixedCostMutationFn = Apollo.MutationFunction<CreateFixedCostMutation, CreateFixedCostMutationVariables>;

/**
 * __useCreateFixedCostMutation__
 *
 * To run a mutation, you first call `useCreateFixedCostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFixedCostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFixedCostMutation, { data, loading, error }] = useCreateFixedCostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFixedCostMutation(baseOptions?: Apollo.MutationHookOptions<CreateFixedCostMutation, CreateFixedCostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFixedCostMutation, CreateFixedCostMutationVariables>(CreateFixedCostDocument, options);
      }
export type CreateFixedCostMutationHookResult = ReturnType<typeof useCreateFixedCostMutation>;
export type CreateFixedCostMutationResult = Apollo.MutationResult<CreateFixedCostMutation>;
export type CreateFixedCostMutationOptions = Apollo.BaseMutationOptions<CreateFixedCostMutation, CreateFixedCostMutationVariables>;
export const CreateFixedCostPatternDocument = gql`
    mutation CreateFixedCostPattern($input: CreateFixedCostPatternInput!) {
  createFixedCostPattern(input: $input) {
    success
    message
  }
}
    `;
export type CreateFixedCostPatternMutationFn = Apollo.MutationFunction<CreateFixedCostPatternMutation, CreateFixedCostPatternMutationVariables>;

/**
 * __useCreateFixedCostPatternMutation__
 *
 * To run a mutation, you first call `useCreateFixedCostPatternMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFixedCostPatternMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFixedCostPatternMutation, { data, loading, error }] = useCreateFixedCostPatternMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFixedCostPatternMutation(baseOptions?: Apollo.MutationHookOptions<CreateFixedCostPatternMutation, CreateFixedCostPatternMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFixedCostPatternMutation, CreateFixedCostPatternMutationVariables>(CreateFixedCostPatternDocument, options);
      }
export type CreateFixedCostPatternMutationHookResult = ReturnType<typeof useCreateFixedCostPatternMutation>;
export type CreateFixedCostPatternMutationResult = Apollo.MutationResult<CreateFixedCostPatternMutation>;
export type CreateFixedCostPatternMutationOptions = Apollo.BaseMutationOptions<CreateFixedCostPatternMutation, CreateFixedCostPatternMutationVariables>;
export const CreateLoanDocument = gql`
    mutation CreateLoan($input: CreateLoanInput!) {
  createLoan(input: $input) {
    success
    message
  }
}
    `;
export type CreateLoanMutationFn = Apollo.MutationFunction<CreateLoanMutation, CreateLoanMutationVariables>;

/**
 * __useCreateLoanMutation__
 *
 * To run a mutation, you first call `useCreateLoanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoanMutation, { data, loading, error }] = useCreateLoanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLoanMutation(baseOptions?: Apollo.MutationHookOptions<CreateLoanMutation, CreateLoanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLoanMutation, CreateLoanMutationVariables>(CreateLoanDocument, options);
      }
export type CreateLoanMutationHookResult = ReturnType<typeof useCreateLoanMutation>;
export type CreateLoanMutationResult = Apollo.MutationResult<CreateLoanMutation>;
export type CreateLoanMutationOptions = Apollo.BaseMutationOptions<CreateLoanMutation, CreateLoanMutationVariables>;
export const CreateManyExpendituresDocument = gql`
    mutation CreateManyExpenditures($inputs: [CreateExpenditureInput!]!) {
  createManyExpenditures(inputs: $inputs) {
    success
    message
  }
}
    `;
export type CreateManyExpendituresMutationFn = Apollo.MutationFunction<CreateManyExpendituresMutation, CreateManyExpendituresMutationVariables>;

/**
 * __useCreateManyExpendituresMutation__
 *
 * To run a mutation, you first call `useCreateManyExpendituresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManyExpendituresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManyExpendituresMutation, { data, loading, error }] = useCreateManyExpendituresMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useCreateManyExpendituresMutation(baseOptions?: Apollo.MutationHookOptions<CreateManyExpendituresMutation, CreateManyExpendituresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateManyExpendituresMutation, CreateManyExpendituresMutationVariables>(CreateManyExpendituresDocument, options);
      }
export type CreateManyExpendituresMutationHookResult = ReturnType<typeof useCreateManyExpendituresMutation>;
export type CreateManyExpendituresMutationResult = Apollo.MutationResult<CreateManyExpendituresMutation>;
export type CreateManyExpendituresMutationOptions = Apollo.BaseMutationOptions<CreateManyExpendituresMutation, CreateManyExpendituresMutationVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    success
    message
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const DeleteManyExpendituresDocument = gql`
    mutation DeleteManyExpenditures($ids: [String!]!) {
  deleteManyExpenditures(ids: $ids) {
    success
    message
  }
}
    `;
export type DeleteManyExpendituresMutationFn = Apollo.MutationFunction<DeleteManyExpendituresMutation, DeleteManyExpendituresMutationVariables>;

/**
 * __useDeleteManyExpendituresMutation__
 *
 * To run a mutation, you first call `useDeleteManyExpendituresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManyExpendituresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManyExpendituresMutation, { data, loading, error }] = useDeleteManyExpendituresMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteManyExpendituresMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManyExpendituresMutation, DeleteManyExpendituresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteManyExpendituresMutation, DeleteManyExpendituresMutationVariables>(DeleteManyExpendituresDocument, options);
      }
export type DeleteManyExpendituresMutationHookResult = ReturnType<typeof useDeleteManyExpendituresMutation>;
export type DeleteManyExpendituresMutationResult = Apollo.MutationResult<DeleteManyExpendituresMutation>;
export type DeleteManyExpendituresMutationOptions = Apollo.BaseMutationOptions<DeleteManyExpendituresMutation, DeleteManyExpendituresMutationVariables>;
export const FindAllBanksDocument = gql`
    query FindAllBanks {
  findAllBanks {
    _id
    name
    payments {
      _id
      closingDay
      color
      expenditures {
        _id
        name
        description
        amount
        payment {
          _id
          name
        }
        occurrenceDay
        temporary
        tax {
          _id
          name
        }
        loan {
          _id
          name
        }
        fixedCost {
          _id
          name
        }
        sop {
          _id
          name
        }
        subscriber {
          _id
          name
        }
        duplexingAvoidanceID
      }
      isCredit
      name
      payDay
      uneditable
    }
    branchName
    color
    incomes {
      _id
      amount
      depositDate
      description
      name
      temporary
    }
  }
}
    `;

/**
 * __useFindAllBanksQuery__
 *
 * To run a query within a React component, call `useFindAllBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllBanksQuery(baseOptions?: Apollo.QueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
      }
export function useFindAllBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
        }
export function useFindAllBanksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllBanksQuery, FindAllBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllBanksQuery, FindAllBanksQueryVariables>(FindAllBanksDocument, options);
        }
export type FindAllBanksQueryHookResult = ReturnType<typeof useFindAllBanksQuery>;
export type FindAllBanksLazyQueryHookResult = ReturnType<typeof useFindAllBanksLazyQuery>;
export type FindAllBanksSuspenseQueryHookResult = ReturnType<typeof useFindAllBanksSuspenseQuery>;
export type FindAllBanksQueryResult = Apollo.QueryResult<FindAllBanksQuery, FindAllBanksQueryVariables>;
export const FindAllCategorysDocument = gql`
    query FindAllCategorys {
  findAllCategorys {
    _id
    name
    color
    expenditures {
      _id
      name
      description
      amount
      payment {
        _id
        name
        isCredit
        payDay
        closingDay
        bank {
          _id
          branchName
          color
          name
        }
        color
        uneditable
      }
      occurrenceDay
      temporary
      tax {
        _id
        name
      }
      loan {
        _id
        name
      }
      fixedCost {
        _id
        name
      }
      sop {
        _id
        name
      }
      subscriber {
        _id
        name
      }
      duplexingAvoidanceID
    }
  }
}
    `;

/**
 * __useFindAllCategorysQuery__
 *
 * To run a query within a React component, call `useFindAllCategorysQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategorysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategorysQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategorysQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategorysQuery, FindAllCategorysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategorysQuery, FindAllCategorysQueryVariables>(FindAllCategorysDocument, options);
      }
export function useFindAllCategorysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategorysQuery, FindAllCategorysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategorysQuery, FindAllCategorysQueryVariables>(FindAllCategorysDocument, options);
        }
export function useFindAllCategorysSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllCategorysQuery, FindAllCategorysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllCategorysQuery, FindAllCategorysQueryVariables>(FindAllCategorysDocument, options);
        }
export type FindAllCategorysQueryHookResult = ReturnType<typeof useFindAllCategorysQuery>;
export type FindAllCategorysLazyQueryHookResult = ReturnType<typeof useFindAllCategorysLazyQuery>;
export type FindAllCategorysSuspenseQueryHookResult = ReturnType<typeof useFindAllCategorysSuspenseQuery>;
export type FindAllCategorysQueryResult = Apollo.QueryResult<FindAllCategorysQuery, FindAllCategorysQueryVariables>;
export const FindAllExpendituresDocument = gql`
    query FindAllExpenditures {
  findAllExpenditures {
    _id
    name
    description
    amount
    payment {
      _id
      bank {
        _id
        color
        branchName
        name
      }
      closingDay
      color
      isCredit
      name
      payDay
    }
    occurrenceDay
    temporary
    tax {
      _id
      name
    }
    loan {
      _id
      name
    }
    fixedCost {
      _id
      name
    }
    sop {
      _id
      name
    }
    subscriber {
      _id
      name
    }
    duplexingAvoidanceID
    category {
      color
      name
      _id
    }
  }
}
    `;

/**
 * __useFindAllExpendituresQuery__
 *
 * To run a query within a React component, call `useFindAllExpendituresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllExpendituresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllExpendituresQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllExpendituresQuery(baseOptions?: Apollo.QueryHookOptions<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>(FindAllExpendituresDocument, options);
      }
export function useFindAllExpendituresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>(FindAllExpendituresDocument, options);
        }
export function useFindAllExpendituresSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>(FindAllExpendituresDocument, options);
        }
export type FindAllExpendituresQueryHookResult = ReturnType<typeof useFindAllExpendituresQuery>;
export type FindAllExpendituresLazyQueryHookResult = ReturnType<typeof useFindAllExpendituresLazyQuery>;
export type FindAllExpendituresSuspenseQueryHookResult = ReturnType<typeof useFindAllExpendituresSuspenseQuery>;
export type FindAllExpendituresQueryResult = Apollo.QueryResult<FindAllExpendituresQuery, FindAllExpendituresQueryVariables>;
export const FindAllFixedCostPatternsDocument = gql`
    query FindAllFixedCostPatterns {
  findAllFixedCostPatterns {
    _id
    name
    color
    fixedcosts {
      _id
      payment {
        _id
        name
      }
      amount
      description
      name
      payDay
    }
  }
}
    `;

/**
 * __useFindAllFixedCostPatternsQuery__
 *
 * To run a query within a React component, call `useFindAllFixedCostPatternsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllFixedCostPatternsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllFixedCostPatternsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllFixedCostPatternsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>(FindAllFixedCostPatternsDocument, options);
      }
export function useFindAllFixedCostPatternsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>(FindAllFixedCostPatternsDocument, options);
        }
export function useFindAllFixedCostPatternsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>(FindAllFixedCostPatternsDocument, options);
        }
export type FindAllFixedCostPatternsQueryHookResult = ReturnType<typeof useFindAllFixedCostPatternsQuery>;
export type FindAllFixedCostPatternsLazyQueryHookResult = ReturnType<typeof useFindAllFixedCostPatternsLazyQuery>;
export type FindAllFixedCostPatternsSuspenseQueryHookResult = ReturnType<typeof useFindAllFixedCostPatternsSuspenseQuery>;
export type FindAllFixedCostPatternsQueryResult = Apollo.QueryResult<FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables>;
export const FindAllLoansDocument = gql`
    query FindAllLoans {
  findAllLoans {
    _id
    name
    payment {
      _id
      bank {
        _id
        branchName
        color
        name
      }
      color
      name
      payDay
      isCredit
    }
    installmentsCount
    payDay
    basePrice
    amount
    interest
    rate
    expenditures {
      _id
      amount
      description
      duplexingAvoidanceID
      name
      occurrenceDay
      payment {
        _id
        name
        payDay
      }
      temporary
      category {
        color
        name
        _id
      }
    }
    startDate
  }
}
    `;

/**
 * __useFindAllLoansQuery__
 *
 * To run a query within a React component, call `useFindAllLoansQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllLoansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllLoansQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllLoansQuery(baseOptions?: Apollo.QueryHookOptions<FindAllLoansQuery, FindAllLoansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllLoansQuery, FindAllLoansQueryVariables>(FindAllLoansDocument, options);
      }
export function useFindAllLoansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllLoansQuery, FindAllLoansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllLoansQuery, FindAllLoansQueryVariables>(FindAllLoansDocument, options);
        }
export function useFindAllLoansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllLoansQuery, FindAllLoansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllLoansQuery, FindAllLoansQueryVariables>(FindAllLoansDocument, options);
        }
export type FindAllLoansQueryHookResult = ReturnType<typeof useFindAllLoansQuery>;
export type FindAllLoansLazyQueryHookResult = ReturnType<typeof useFindAllLoansLazyQuery>;
export type FindAllLoansSuspenseQueryHookResult = ReturnType<typeof useFindAllLoansSuspenseQuery>;
export type FindAllLoansQueryResult = Apollo.QueryResult<FindAllLoansQuery, FindAllLoansQueryVariables>;
export const FindAllPaymentsDocument = gql`
    query FindAllPayments {
  findAllPayments {
    _id
    bank {
      _id
      branchName
      name
      color
    }
    closingDay
    color
    isCredit
    name
    payDay
    uneditable
    expenditures {
      _id
      name
      description
      amount
      occurrenceDay
      temporary
      tax {
        _id
        name
      }
      loan {
        _id
        name
      }
      fixedCost {
        _id
        name
      }
      sop {
        _id
        name
      }
      subscriber {
        _id
        name
      }
      category {
        _id
        name
        color
      }
      duplexingAvoidanceID
    }
  }
}
    `;

/**
 * __useFindAllPaymentsQuery__
 *
 * To run a query within a React component, call `useFindAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
      }
export function useFindAllPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
        }
export function useFindAllPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>(FindAllPaymentsDocument, options);
        }
export type FindAllPaymentsQueryHookResult = ReturnType<typeof useFindAllPaymentsQuery>;
export type FindAllPaymentsLazyQueryHookResult = ReturnType<typeof useFindAllPaymentsLazyQuery>;
export type FindAllPaymentsSuspenseQueryHookResult = ReturnType<typeof useFindAllPaymentsSuspenseQuery>;
export type FindAllPaymentsQueryResult = Apollo.QueryResult<FindAllPaymentsQuery, FindAllPaymentsQueryVariables>;
export const FindBankByIdDocument = gql`
    query FindBankByID($findBankByIdId: String!) {
  findBankByID(id: $findBankByIdId) {
    _id
    name
    payments {
      _id
      closingDay
      color
      expenditures {
        _id
        name
        description
        amount
        payment {
          _id
          name
        }
        occurrenceDay
        temporary
        tax {
          _id
          name
        }
        loan {
          _id
          name
        }
        fixedCost {
          _id
          name
        }
        sop {
          _id
          name
        }
        subscriber {
          _id
          name
        }
        duplexingAvoidanceID
      }
      isCredit
      name
      payDay
      uneditable
    }
    branchName
    color
    incomes {
      _id
      amount
      depositDate
      description
      name
      temporary
    }
  }
}
    `;

/**
 * __useFindBankByIdQuery__
 *
 * To run a query within a React component, call `useFindBankByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindBankByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindBankByIdQuery({
 *   variables: {
 *      findBankByIdId: // value for 'findBankByIdId'
 *   },
 * });
 */
export function useFindBankByIdQuery(baseOptions: Apollo.QueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables> & ({ variables: FindBankByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
      }
export function useFindBankByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
        }
export function useFindBankByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindBankByIdQuery, FindBankByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindBankByIdQuery, FindBankByIdQueryVariables>(FindBankByIdDocument, options);
        }
export type FindBankByIdQueryHookResult = ReturnType<typeof useFindBankByIdQuery>;
export type FindBankByIdLazyQueryHookResult = ReturnType<typeof useFindBankByIdLazyQuery>;
export type FindBankByIdSuspenseQueryHookResult = ReturnType<typeof useFindBankByIdSuspenseQuery>;
export type FindBankByIdQueryResult = Apollo.QueryResult<FindBankByIdQuery, FindBankByIdQueryVariables>;
export const FindExpenditureByIdDocument = gql`
    query FindExpenditureByID($findExpenditureByIdId: String!) {
  findExpenditureByID(id: $findExpenditureByIdId) {
    _id
    name
    description
    amount
    payment {
      _id
      bank {
        _id
        color
        branchName
        name
      }
      closingDay
      color
      isCredit
      name
      payDay
    }
    occurrenceDay
    temporary
    tax {
      _id
      name
    }
    loan {
      _id
      name
    }
    fixedCost {
      _id
      name
    }
    sop {
      _id
      name
    }
    subscriber {
      _id
      name
    }
    duplexingAvoidanceID
    category {
      color
      name
      _id
    }
  }
}
    `;

/**
 * __useFindExpenditureByIdQuery__
 *
 * To run a query within a React component, call `useFindExpenditureByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindExpenditureByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindExpenditureByIdQuery({
 *   variables: {
 *      findExpenditureByIdId: // value for 'findExpenditureByIdId'
 *   },
 * });
 */
export function useFindExpenditureByIdQuery(baseOptions: Apollo.QueryHookOptions<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables> & ({ variables: FindExpenditureByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>(FindExpenditureByIdDocument, options);
      }
export function useFindExpenditureByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>(FindExpenditureByIdDocument, options);
        }
export function useFindExpenditureByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>(FindExpenditureByIdDocument, options);
        }
export type FindExpenditureByIdQueryHookResult = ReturnType<typeof useFindExpenditureByIdQuery>;
export type FindExpenditureByIdLazyQueryHookResult = ReturnType<typeof useFindExpenditureByIdLazyQuery>;
export type FindExpenditureByIdSuspenseQueryHookResult = ReturnType<typeof useFindExpenditureByIdSuspenseQuery>;
export type FindExpenditureByIdQueryResult = Apollo.QueryResult<FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables>;
export const FindFixedCostByIdDocument = gql`
    query FindFixedCostByID($findFixedCostByIdId: String!) {
  findFixedCostByID(id: $findFixedCostByIdId) {
    _id
    name
    description
    amount
    payment {
      bank {
        branchName
        name
        color
        _id
      }
      name
      color
      _id
    }
    payDay
    fixedCostPattern {
      _id
      color
      name
    }
  }
}
    `;

/**
 * __useFindFixedCostByIdQuery__
 *
 * To run a query within a React component, call `useFindFixedCostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFixedCostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFixedCostByIdQuery({
 *   variables: {
 *      findFixedCostByIdId: // value for 'findFixedCostByIdId'
 *   },
 * });
 */
export function useFindFixedCostByIdQuery(baseOptions: Apollo.QueryHookOptions<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables> & ({ variables: FindFixedCostByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>(FindFixedCostByIdDocument, options);
      }
export function useFindFixedCostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>(FindFixedCostByIdDocument, options);
        }
export function useFindFixedCostByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>(FindFixedCostByIdDocument, options);
        }
export type FindFixedCostByIdQueryHookResult = ReturnType<typeof useFindFixedCostByIdQuery>;
export type FindFixedCostByIdLazyQueryHookResult = ReturnType<typeof useFindFixedCostByIdLazyQuery>;
export type FindFixedCostByIdSuspenseQueryHookResult = ReturnType<typeof useFindFixedCostByIdSuspenseQuery>;
export type FindFixedCostByIdQueryResult = Apollo.QueryResult<FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables>;
export const FindFixedCostPatternByIdDocument = gql`
    query FindFixedCostPatternByID($findFixedCostPatternByIdId: String!) {
  findFixedCostPatternByID(id: $findFixedCostPatternByIdId) {
    _id
    name
    color
    fixedcosts {
      _id
      payment {
        _id
        name
      }
      amount
      description
      name
      payDay
    }
  }
}
    `;

/**
 * __useFindFixedCostPatternByIdQuery__
 *
 * To run a query within a React component, call `useFindFixedCostPatternByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFixedCostPatternByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFixedCostPatternByIdQuery({
 *   variables: {
 *      findFixedCostPatternByIdId: // value for 'findFixedCostPatternByIdId'
 *   },
 * });
 */
export function useFindFixedCostPatternByIdQuery(baseOptions: Apollo.QueryHookOptions<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables> & ({ variables: FindFixedCostPatternByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>(FindFixedCostPatternByIdDocument, options);
      }
export function useFindFixedCostPatternByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>(FindFixedCostPatternByIdDocument, options);
        }
export function useFindFixedCostPatternByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>(FindFixedCostPatternByIdDocument, options);
        }
export type FindFixedCostPatternByIdQueryHookResult = ReturnType<typeof useFindFixedCostPatternByIdQuery>;
export type FindFixedCostPatternByIdLazyQueryHookResult = ReturnType<typeof useFindFixedCostPatternByIdLazyQuery>;
export type FindFixedCostPatternByIdSuspenseQueryHookResult = ReturnType<typeof useFindFixedCostPatternByIdSuspenseQuery>;
export type FindFixedCostPatternByIdQueryResult = Apollo.QueryResult<FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables>;
export const FindLoanByIdDocument = gql`
    query FindLoanByID($findLoanByIdId: String!) {
  findLoanByID(id: $findLoanByIdId) {
    _id
    name
    payment {
      _id
      bank {
        _id
        branchName
        color
        name
      }
      color
      name
      payDay
      isCredit
    }
    installmentsCount
    payDay
    basePrice
    amount
    interest
    rate
    expenditures {
      _id
      amount
      description
      duplexingAvoidanceID
      name
      occurrenceDay
      payment {
        _id
        bank {
          _id
          branchName
          color
          name
        }
        name
        payDay
      }
      temporary
      category {
        color
        name
        _id
      }
    }
    startDate
  }
}
    `;

/**
 * __useFindLoanByIdQuery__
 *
 * To run a query within a React component, call `useFindLoanByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLoanByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLoanByIdQuery({
 *   variables: {
 *      findLoanByIdId: // value for 'findLoanByIdId'
 *   },
 * });
 */
export function useFindLoanByIdQuery(baseOptions: Apollo.QueryHookOptions<FindLoanByIdQuery, FindLoanByIdQueryVariables> & ({ variables: FindLoanByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLoanByIdQuery, FindLoanByIdQueryVariables>(FindLoanByIdDocument, options);
      }
export function useFindLoanByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLoanByIdQuery, FindLoanByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLoanByIdQuery, FindLoanByIdQueryVariables>(FindLoanByIdDocument, options);
        }
export function useFindLoanByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindLoanByIdQuery, FindLoanByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindLoanByIdQuery, FindLoanByIdQueryVariables>(FindLoanByIdDocument, options);
        }
export type FindLoanByIdQueryHookResult = ReturnType<typeof useFindLoanByIdQuery>;
export type FindLoanByIdLazyQueryHookResult = ReturnType<typeof useFindLoanByIdLazyQuery>;
export type FindLoanByIdSuspenseQueryHookResult = ReturnType<typeof useFindLoanByIdSuspenseQuery>;
export type FindLoanByIdQueryResult = Apollo.QueryResult<FindLoanByIdQuery, FindLoanByIdQueryVariables>;
export const FindPaymentByIdDocument = gql`
    query FindPaymentByID($findPaymentByIdId: String!) {
  findPaymentByID(id: $findPaymentByIdId) {
    _id
    bank {
      _id
      branchName
      name
      color
    }
    closingDay
    color
    isCredit
    name
    payDay
    uneditable
  }
}
    `;

/**
 * __useFindPaymentByIdQuery__
 *
 * To run a query within a React component, call `useFindPaymentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPaymentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPaymentByIdQuery({
 *   variables: {
 *      findPaymentByIdId: // value for 'findPaymentByIdId'
 *   },
 * });
 */
export function useFindPaymentByIdQuery(baseOptions: Apollo.QueryHookOptions<FindPaymentByIdQuery, FindPaymentByIdQueryVariables> & ({ variables: FindPaymentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>(FindPaymentByIdDocument, options);
      }
export function useFindPaymentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>(FindPaymentByIdDocument, options);
        }
export function useFindPaymentByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>(FindPaymentByIdDocument, options);
        }
export type FindPaymentByIdQueryHookResult = ReturnType<typeof useFindPaymentByIdQuery>;
export type FindPaymentByIdLazyQueryHookResult = ReturnType<typeof useFindPaymentByIdLazyQuery>;
export type FindPaymentByIdSuspenseQueryHookResult = ReturnType<typeof useFindPaymentByIdSuspenseQuery>;
export type FindPaymentByIdQueryResult = Apollo.QueryResult<FindPaymentByIdQuery, FindPaymentByIdQueryVariables>;
export const UpdateBankDocument = gql`
    mutation UpdateBank($updateBankId: String!, $input: UpdateBankInput!) {
  updateBank(id: $updateBankId, input: $input) {
    success
    message
  }
}
    `;
export type UpdateBankMutationFn = Apollo.MutationFunction<UpdateBankMutation, UpdateBankMutationVariables>;

/**
 * __useUpdateBankMutation__
 *
 * To run a mutation, you first call `useUpdateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankMutation, { data, loading, error }] = useUpdateBankMutation({
 *   variables: {
 *      updateBankId: // value for 'updateBankId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBankMutation, UpdateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBankMutation, UpdateBankMutationVariables>(UpdateBankDocument, options);
      }
export type UpdateBankMutationHookResult = ReturnType<typeof useUpdateBankMutation>;
export type UpdateBankMutationResult = Apollo.MutationResult<UpdateBankMutation>;
export type UpdateBankMutationOptions = Apollo.BaseMutationOptions<UpdateBankMutation, UpdateBankMutationVariables>;
export const UpdateExpenditureDocument = gql`
    mutation UpdateExpenditure($updateExpenditureId: String!, $input: UpdateExpenditureInput!) {
  updateExpenditure(id: $updateExpenditureId, input: $input) {
    message
    success
  }
}
    `;
export type UpdateExpenditureMutationFn = Apollo.MutationFunction<UpdateExpenditureMutation, UpdateExpenditureMutationVariables>;

/**
 * __useUpdateExpenditureMutation__
 *
 * To run a mutation, you first call `useUpdateExpenditureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenditureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenditureMutation, { data, loading, error }] = useUpdateExpenditureMutation({
 *   variables: {
 *      updateExpenditureId: // value for 'updateExpenditureId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExpenditureMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpenditureMutation, UpdateExpenditureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExpenditureMutation, UpdateExpenditureMutationVariables>(UpdateExpenditureDocument, options);
      }
export type UpdateExpenditureMutationHookResult = ReturnType<typeof useUpdateExpenditureMutation>;
export type UpdateExpenditureMutationResult = Apollo.MutationResult<UpdateExpenditureMutation>;
export type UpdateExpenditureMutationOptions = Apollo.BaseMutationOptions<UpdateExpenditureMutation, UpdateExpenditureMutationVariables>;
export const UpdateFixedCostDocument = gql`
    mutation UpdateFixedCost($updateFixedCostId: String!, $input: UpdateFixedCostInput!) {
  updateFixedCost(id: $updateFixedCostId, input: $input) {
    message
    success
  }
}
    `;
export type UpdateFixedCostMutationFn = Apollo.MutationFunction<UpdateFixedCostMutation, UpdateFixedCostMutationVariables>;

/**
 * __useUpdateFixedCostMutation__
 *
 * To run a mutation, you first call `useUpdateFixedCostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFixedCostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFixedCostMutation, { data, loading, error }] = useUpdateFixedCostMutation({
 *   variables: {
 *      updateFixedCostId: // value for 'updateFixedCostId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFixedCostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFixedCostMutation, UpdateFixedCostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFixedCostMutation, UpdateFixedCostMutationVariables>(UpdateFixedCostDocument, options);
      }
export type UpdateFixedCostMutationHookResult = ReturnType<typeof useUpdateFixedCostMutation>;
export type UpdateFixedCostMutationResult = Apollo.MutationResult<UpdateFixedCostMutation>;
export type UpdateFixedCostMutationOptions = Apollo.BaseMutationOptions<UpdateFixedCostMutation, UpdateFixedCostMutationVariables>;
export const UpdateFixedCostPatternDocument = gql`
    mutation UpdateFixedCostPattern($updateFixedCostPatternId: String!, $input: UpdateFixedCostPatternInput!) {
  updateFixedCostPattern(id: $updateFixedCostPatternId, input: $input) {
    message
    success
  }
}
    `;
export type UpdateFixedCostPatternMutationFn = Apollo.MutationFunction<UpdateFixedCostPatternMutation, UpdateFixedCostPatternMutationVariables>;

/**
 * __useUpdateFixedCostPatternMutation__
 *
 * To run a mutation, you first call `useUpdateFixedCostPatternMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFixedCostPatternMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFixedCostPatternMutation, { data, loading, error }] = useUpdateFixedCostPatternMutation({
 *   variables: {
 *      updateFixedCostPatternId: // value for 'updateFixedCostPatternId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFixedCostPatternMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFixedCostPatternMutation, UpdateFixedCostPatternMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFixedCostPatternMutation, UpdateFixedCostPatternMutationVariables>(UpdateFixedCostPatternDocument, options);
      }
export type UpdateFixedCostPatternMutationHookResult = ReturnType<typeof useUpdateFixedCostPatternMutation>;
export type UpdateFixedCostPatternMutationResult = Apollo.MutationResult<UpdateFixedCostPatternMutation>;
export type UpdateFixedCostPatternMutationOptions = Apollo.BaseMutationOptions<UpdateFixedCostPatternMutation, UpdateFixedCostPatternMutationVariables>;
export const UpdateLoanDocument = gql`
    mutation UpdateLoan($updateLoanId: String!, $input: UpdateLoanInput!) {
  updateLoan(id: $updateLoanId, input: $input) {
    success
    message
  }
}
    `;
export type UpdateLoanMutationFn = Apollo.MutationFunction<UpdateLoanMutation, UpdateLoanMutationVariables>;

/**
 * __useUpdateLoanMutation__
 *
 * To run a mutation, you first call `useUpdateLoanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoanMutation, { data, loading, error }] = useUpdateLoanMutation({
 *   variables: {
 *      updateLoanId: // value for 'updateLoanId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLoanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoanMutation, UpdateLoanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoanMutation, UpdateLoanMutationVariables>(UpdateLoanDocument, options);
      }
export type UpdateLoanMutationHookResult = ReturnType<typeof useUpdateLoanMutation>;
export type UpdateLoanMutationResult = Apollo.MutationResult<UpdateLoanMutation>;
export type UpdateLoanMutationOptions = Apollo.BaseMutationOptions<UpdateLoanMutation, UpdateLoanMutationVariables>;
export const UpdatePaymentDocument = gql`
    mutation UpdatePayment($updatePaymentId: String!, $input: UpdatePaymentInput!) {
  updatePayment(id: $updatePaymentId, input: $input) {
    success
    message
  }
}
    `;
export type UpdatePaymentMutationFn = Apollo.MutationFunction<UpdatePaymentMutation, UpdatePaymentMutationVariables>;

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      updatePaymentId: // value for 'updatePaymentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument, options);
      }
export type UpdatePaymentMutationHookResult = ReturnType<typeof useUpdatePaymentMutation>;
export type UpdatePaymentMutationResult = Apollo.MutationResult<UpdatePaymentMutation>;
export type UpdatePaymentMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentMutation, UpdatePaymentMutationVariables>;