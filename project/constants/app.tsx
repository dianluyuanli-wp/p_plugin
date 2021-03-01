//  路由名字
export const PAGE_NAME = {
    HOME: '',   //  首页
    CREATE_ACCOUNT: '/createAccount',   //  创建页面
    RECIENT: '/recient',    //  收款
    TRANSFER: '/transfer',  //  转账
    USER_AGREEMENT: '/userAgreement',    //  用户协议
    SET_PANEL: '/setPanel', //  设置面板
    WALLET_MANAGE: '/walletManage', //  钱包管理
    RETRIEVE_WALLET: '/retrieveWallet', //  恢复钱包
    RW_MNEMONIC: '/retrieveWallet/mnemonic', //  恢复钱包-助记词
    RW_KEYSTORE: '/retrieveWallet/keyStore', //  恢复钱包-keyStore json
    SINGLE_WALLTE_MANAGE: '/setWalletDetial', //  单个钱包设置
    SW_EDIT_NAME: '/setWalletDetial/editName', //  单个钱包，修改名称
    SW_EDIT_SECRET: '/setWalletDetial/editSecret', //   单个钱包，修改密码
    SW_EDIT_BACKUP: '/setWalletDetial/backupKeyStore', //   单个钱包,备份store
    SW_EDIT_DELETE: '/setWalletDetial/deleteAccount', //    单个钱包，删除账号
    RECIPIENT_ADDRESS: '/recipientAddress', //    转账地址，入口
    RECIPIENT_ADD_NEW_OR_EDIT: '/recipientAddress/addNewOrEdit', //   转账地址，新增
    GENERAL_SETTING: '/generalSetting', //   通用配置
    GENERAL_SETTING_LANGUAGE: '/generalSetting/language' // 通用配置 语言
}