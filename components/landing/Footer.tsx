import Link from "next/link";
import { Snowflake } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand text-white py-16 md:py-24">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand Info */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
                            <div className="bg-white rounded-lg p-1.5">
                                <Snowflake className="text-brand w-6 h-6" />
                            </div>
                            <span className="font-heading text-heading-sm font-bold tracking-tight">
                                Snowfall
                            </span>
                        </Link>
                        <p className="text-white/80 max-w-sm leading-relaxed">
                            Empowering snow contractors with real-time monitoring and
                            automated communication. The future of snow management is here.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-heading font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-white/70">
                            <li>
                                <Link href="#features" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Roadmap
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-heading font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-white/70">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-caption">
                    <p>© {new Date().getFullYear()} Snowfall. All rights reserved.</p>
                    <p>Built with precision for the modern contractor.</p>
                </div>
            </div>
        </footer>
    );
}
