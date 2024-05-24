#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, x: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {

    #[storage]
    struct Storage {
       data: u128,
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, x:u128) {
            self.data.write(x*2);
        }

        fn get(self: @ContractState) -> u128 {
            self.data.read()
        }
    }
}

#[cfg(test)]
mod tests {

    #[test]
    fn it_works() {
        assert(1==1, ':)');
    }
}
