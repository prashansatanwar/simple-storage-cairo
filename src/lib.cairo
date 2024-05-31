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
            self.data.write(x);
        }

        fn get(self: @ContractState) -> u128 {
            self.data.read()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{ SimpleStorage, ISimpleStorageDispatcher, ISimpleStorageDispatcherTrait };
    use starknet::{ ContractAddress, syscalls::deploy_syscall };

    fn deploy_contract() -> ISimpleStorageDispatcher {
        let mut calldata = ArrayTrait::new();
        let (address0, _) = deploy_syscall(
            SimpleStorage::TEST_CLASS_HASH.try_into().unwrap(), 0, calldata.span(), false
        )
            .unwrap();
        let contract0 = ISimpleStorageDispatcher { contract_address: address0 };
        contract0
    }

    #[test]
    #[available_gas(1000000)]
    fn test_get() {
        let contract = deploy_contract();
        let data = contract.get();

        assert_eq!(0, data);
    }

    #[test]
    #[available_gas(1000000)]
    fn test_set() {
        let contract = deploy_contract();
        contract.set(10);
        let data = contract.get();

        assert_eq!(10, data);
    }
}
