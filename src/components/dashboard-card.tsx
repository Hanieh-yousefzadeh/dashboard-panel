import { Users, Package, ShoppingCart, Wallet, MessageSquare, Clock, Heart, MapPin } from "lucide-react";



const icons = {
    users: Users,
    package: Package,
    "shopping-cart": ShoppingCart,
    wallet: Wallet,
    "message-square": MessageSquare,
    clock: Clock,
    heart: Heart,
    "map-pin": MapPin,
}
export type Card = {
    title: string
    value: string | number
    description: string
    icon: keyof typeof icons
};

export default function DashboardCard({ title, value, icon, description }: Card) {

    const Icon = icons[icon]
    if (!Icon) {
        console.error("Invalid dashboard icon:", icon);
        return null;
    }
    return (
        <div className="rounded-2xl border border-[#7a3ffa0b] bg-[#f1ebfe6a] dark:bg-[#14162A] p-5 shadow-sm flex flex-col justify-center items-center md:w-58  w-45 md:h-30 ">
            <div className="flex items-center justify-between">
                <div className="rounded-lg p-2"> <Icon className="sm:size-5" /> </div>
                <p className="text-sm"> {title} </p>

            </div>
            <h2 className=" sm:text-2xl font-bold"> {value} </h2>
            <p className="text-xs text-[#9468fc] dark:text-[#af8dfc] pt-2">{description}</p>
        </div>
    );

}