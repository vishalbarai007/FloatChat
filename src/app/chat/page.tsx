"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/src/components/chat-message";
import { ChatInput } from "@/src/components/chat-input";
import { ChatHistorySidebar } from "@/src/components/chat-history-sidebar";
import { QuickExamplesSidebar } from "@/src/components/quick-examples-sidebar";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Badge } from "@/src/components/ui/badge";
import { Menu, Lightbulb, Sparkles, TrendingUp, BarChart3 } from "lucide-react";
import { Navbar } from "@/src/components/navbar";

interface Message {
	id: string;
	content: string;
	isUser: boolean;
	timestamp: string;
	isHtml?: boolean;
}

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content:
				"Hello! I'm your AI assistant for exploring ocean data. Please upload a NetCDF file first, then ask me a question about it.",
			isUser: false,
			timestamp: new Date().toLocaleTimeString(),
		},
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [showChatHistory, setShowChatHistory] = useState(false);
	const [showQuickExamples, setShowQuickExamples] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = async (content: string) => {
		const userMessage: Message = {
			id: Date.now().toString(),
			content,
			isUser: true,
			timestamp: new Date().toLocaleTimeString(),
		};

		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.append("query", content);

			const response = await fetch(
				"http://127.0.0.1:8000/chatbot-response",
				{
					method: "POST",
					body: formData,
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.detail || "Failed to get AI response",
				);
			}

			const contentType = response.headers.get("content-type");
			let aiMessage: Message;

			if (contentType && contentType.includes("text/html")) {
				const htmlContent = await response.text();
				aiMessage = {
					id: (Date.now() + 1).toString(),
					content: htmlContent,
					isUser: false,
					timestamp: new Date().toLocaleTimeString(),
					isHtml: true,
				};
			} else {
				const data = await response.json();
				const messageContent =
					data.message || "No data found for this query.";
				const preview = data.preview
					? `\n\n**Data Preview:**\n\`\`\`json\n${JSON.stringify(
							data.preview,
							null,
							2,
						)}\n\`\`\``
					: "";

				aiMessage = {
					id: (Date.now() + 1).toString(),
					content: messageContent + preview,
					isUser: false,
					timestamp: new Date().toLocaleTimeString(),
				};
			}

			setMessages((prevMessages) => [...prevMessages, aiMessage]);
		} catch (error: any) {
			console.error("Chat error:", error);

			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: `I apologize, but an error occurred. Please ensure the backend is running and data has been uploaded.\n\n**Error:** ${error.message}`,
				isUser: false,
				timestamp: new Date().toLocaleTimeString(),
			};

			setMessages((prevMessages) => [...prevMessages, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// NOTE: Simplified component state for integration. Authentication and history logic removed to resolve compilation errors.

	return (
		<div className="h-screen flex flex-col bg-background">
			<Navbar />

			{/* Main Container */}
			<div className="flex flex-1 relative overflow-hidden">
				{/* Sidebars */}
				<ChatHistorySidebar
					isOpen={showChatHistory}
					onClose={() => setShowChatHistory(false)} 
					onNewChat={function (): void {
						throw new Error("Function not implemented.");
					}} 
					onSelectChat={function (chatId: string): void {
						throw new Error("Function not implemented.");
					}} 
					activeChat={""} 
					chatHistory={[]}				
				/>
				<QuickExamplesSidebar
					isOpen={showQuickExamples}
					onClose={() => setShowQuickExamples(false)} 
					onSelectExample={function (example: string): void {
						throw new Error("Function not implemented.");
					}}				
				/>

				{/* Main Chat Container */}
				<div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6">
					{/* Header */}
					<div className="flex items-center justify-between mb-4 flex-shrink-0">
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setShowChatHistory(true)}
								className="flex items-center gap-2"
							>
								<Menu className="w-4 h-4" />
								Chat History
							</Button>
						</div>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setShowQuickExamples(true)}
								className="flex items-center gap-2"
							>
								<Lightbulb className="w-4 h-4" />
								Quick Examples
							</Button>
						</div>
					</div>

					{/* Chat Messages Container */}
					<Card className="flex-1 flex flex-col min-h-0">
						{/* Messages Area - Scrollable */}
						<div className="flex-1 overflow-hidden">
							<ScrollArea className="h-full">
								<div className="p-4 space-y-4">
									{messages.map((message) => (
										<div
											key={message.id}
											className={`flex ${
												message.isUser 
													? "justify-end" 
													: "justify-start"
											}`}
										>
											<div
												className={`max-w-[80%] rounded-lg px-4 py-3 ${
													message.isUser
														? "bg-primary text-primary-foreground ml-12"
														: "bg-muted text-muted-foreground mr-12"
												}`}
											>
												<ChatMessage
													message={message.content}
													isUser={message.isUser}
													timestamp={message.timestamp}
													isHtml={message.isHtml}
												/>
											</div>
										</div>
									))}
									{isLoading && (
										<div className="flex justify-start">
											<div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted text-muted-foreground mr-12">
												<ChatMessage
													message="Thinking..."
													isUser={false}
													timestamp={new Date().toLocaleTimeString()}
												/>
											</div>
										</div>
									)}
									<div ref={messagesEndRef} />
								</div>
							</ScrollArea>
						</div>

						{/* Input Area - Fixed at bottom */}
						<div className="border-t bg-background p-4 flex-shrink-0">
							<div className="max-w-4xl mx-auto w-full">
								<ChatInput
									onSendMessage={handleSendMessage}
									disabled={isLoading}
									placeholder="Ask about the uploaded ocean data..."
								/>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}