import Web3 from 'web3';
import DeVacContract from '../abis/DeVacContract.json';

export class BlockchainService {
  private _window: any = window as any;
  private web3: Web3;
  private deVacContract: any;

  public async isConnected(): Promise<boolean> {
    return typeof this.web3 !== 'undefined' && (await this.web3.eth.getChainId()) > 0;
  }

  public async connect(): Promise<void> {
    if (this._window.ethereum) {
      try {
        this.web3 = new Web3(this._window.ethereum);
        const defaultAccount = await this._window.ethereum.enable();
        this.web3.eth.defaultAccount = defaultAccount[0];

        const netId = await this.web3.eth.net.getId();

        this.deVacContract = new this.web3.eth.Contract(
          DeVacContract.abi as any,
          (DeVacContract.networks as any)[netId].address,
        );

        this.subscribeToWebWalletEvents();
      } catch (error) {
        throw new Error('could not connect to the blockchain');
      }
    } else {
      throw new Error('Please use MetaMask');
    }
  }

  public disconnect(): void {
    this.web3 = <any>undefined;
  }

  public async createCertificate(fullName: string, address: string): Promise<void> {
    console.log(fullName);
    console.log(address);
  }

  public getCurrentAccountAddress(): string | null {
    return this.web3.eth.defaultAccount;
  }

  public async getBalance(): Promise<string> {
    if (await this.isConnected()) {
      return Number(
        this.web3.utils.fromWei(await this.web3.eth.getBalance(this.web3.eth.defaultAccount as string)),
      ).toFixed(5);
    } else {
      throw new Error('Not connected to blockchain network.');
    }
  }

  public async isOwner(): Promise<boolean> {
    if (await this.isConnected()) {
      return await this.deVacContract.methods.isOwner().call();
    } else {
      throw new Error('Not connected to blockchain network.');
    }
  }

  private subscribeToWebWalletEvents(): void {
    this._window.ethereum.on('accountsChanged', (): void => {
      this._window.location.reload();
    });
  }
}
