export const db_Name = "MyECommerce";   // db name

// enum user roles  
export const userRoleEnum = {
    ADMIN: "admin",
    USER: "user"
}
export const availableUserRoleEnum = Object.values(userRoleEnum)

//  enum category 
export const enumCategory = {
    SUMMER: "Summer",
    WINTER: "Winter",
    FORMAl: "formal"
}
export const avilableEnumCategory = Object.values(enumCategory);

// Enum Payment status
export const enumPaymentStatus = {
    PENDING: "pending",
    FAILED: "failed",
    PAID: "paid"
}
export const availableEnumPaymentStatus = Object.values(enumPaymentStatus);

// enum order Status
export const enumOrderStatus = {
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCEL: "Cancel"
}
export const availableOrderStatus = Object.values(enumOrderStatus);
