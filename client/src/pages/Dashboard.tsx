import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Building2, Mail, MessageSquare, CheckCircle2, Clock, Loader2, BookOpen, FileText, Video } from "lucide-react";
import { committeeGroups } from "@/data/committees";
import { Link } from "wouter";
import type { ForumDoubt } from "@shared/schema";
import { committeeResources } from "@/data/resources";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [newQuestion, setNewQuestion] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/");
    }
  }, [authLoading, user, setLocation]);

  const { data: myDoubts, isLoading: doubtsLoading } = useQuery<ForumDoubt[]>({
    queryKey: ["/api/forum/doubts/user/me"],
    enabled: !!user,
  });

  const { data: committeeDoubts, isLoading: committeeDoubtsLoading } = useQuery<ForumDoubt[]>({
    queryKey: [`/api/forum/doubts/${user?.committee}`],
    enabled: !!user?.committee,
  });

  const createDoubtMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/forum/doubts", {
        committeeName: user?.committee,
        question,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Question submitted",
        description: "Your question has been submitted for moderation",
      });
      setNewQuestion("");
      queryClient.invalidateQueries({ queryKey: ["/api/forum/doubts/user/me"] });
      queryClient.invalidateQueries({ queryKey: [`/api/forum/doubts/${user?.committee}`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit question",
        variant: "destructive",
      });
    },
  });

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userCommittee = committeeGroups
    .flatMap(group => group.committees)
    .find(committee => committee.name === user.committee);

  const committeeResourcesList = [
    ...(committeeResources["All Committees"] || []),
    ...(committeeResources[user.committee] || [])
  ];

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }
    createDoubtMutation.mutate(newQuestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-background via-muted/10 to-primary/5 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-primary mb-4">
            My Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, Delegate! 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow" data-testid="card-user-details">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Delegate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">ID Number</p>
                <p className="text-lg font-semibold" data-testid="text-id-number">{user.idNumber}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-lg" data-testid="text-gmail">{user.gmail}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Committee</p>
                <Link href="/committees">
                  <Badge className="text-base px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity" data-testid="badge-committee">
                    {user.committee}
                  </Badge>
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Institution
                </p>
                <p className="text-lg" data-testid="text-institution">{user.institution}</p>
              </div>
            </CardContent>
          </Card>

          {userCommittee && (
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow" data-testid="card-committee-info">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Committee Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Committee Name</p>
                  <p className="text-lg font-semibold" data-testid="text-committee-name">{userCommittee.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Topic</p>
                  <p className="text-sm" data-testid="text-committee-topic">{userCommittee.topic}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Chair</p>
                  <p className="text-lg" data-testid="text-chair">{userCommittee.chair}</p>
                </div>
                {userCommittee.floor && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg" data-testid="text-location">
                      {userCommittee.floor}
                      {userCommittee.location && ` - ${userCommittee.location}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow" data-testid="card-forum">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Ask a Question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ask questions to your committee chairs. Your questions will be moderated before appearing.
                </p>
                <Textarea
                  placeholder="Type your question here..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[100px] resize-none"
                  data-testid="textarea-question"
                />
                <Button
                  onClick={handleSubmitQuestion}
                  disabled={createDoubtMutation.isPending}
                  className="w-full"
                  data-testid="button-submit-question"
                >
                  {createDoubtMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Question"
                  )}
                </Button>
              </div>

              {doubtsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : myDoubts && myDoubts.length > 0 ? (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="font-semibold text-lg">My Questions</h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {myDoubts.map((doubt) => (
                      <Card key={doubt.id} className="bg-muted/20" data-testid={`card-doubt-${doubt.id}`}>
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-sm flex-1" data-testid="text-doubt-question">{doubt.question}</p>
                            {doubt.isApproved ? (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Approved
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          {doubt.response && (
                            <div className="bg-primary/10 border-l-4 border-primary p-3 rounded">
                              <p className="text-sm font-semibold mb-1">Response:</p>
                              <p className="text-sm break-words whitespace-pre-wrap" data-testid="text-doubt-response">{doubt.response}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <Separator />
                  <p className="text-center text-muted-foreground py-8">No questions yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow" data-testid="card-resources">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Committee Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Access study guides, templates, and videos for your committee.
              </p>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {committeeResourcesList.map((category, idx) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={idx} className="bg-muted/20 hover:bg-muted/30 transition-colors" data-testid={`card-resource-${idx}`}>
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-sm">{category.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                        <div className="space-y-1">
                          {category.links.map((link, linkIdx) => {
                            const LinkIcon = link.icon;
                            return (
                              <a
                                key={linkIdx}
                                href={link.href || "#"}
                                className="flex items-center gap-2 text-xs text-primary hover:underline py-1"
                                data-testid={`link-resource-${idx}-${linkIdx}`}
                              >
                                <LinkIcon className="w-3 h-3" />
                                {link.text}
                              </a>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Link href={`/resources?committee=${encodeURIComponent(user.committee)}`}>
                <Button variant="outline" className="w-full" data-testid="button-committee-resources">
                  Show {user.committee} Resources
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow" data-testid="card-committee-forum">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Committee Forum - Approved Questions & Responses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {committeeDoubtsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : committeeDoubts && committeeDoubts.length > 0 ? (
              <div className="space-y-4">
                {committeeDoubts.map((doubt) => (
                  <Card key={doubt.id} className="bg-gradient-to-r from-muted/20 to-muted/10 border-l-4 border-primary" data-testid={`card-committee-doubt-${doubt.id}`}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-medium text-base flex-1" data-testid="text-committee-doubt-question">{doubt.question}</p>
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Answered
                        </Badge>
                      </div>
                      {doubt.response && (
                        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-md">
                          <p className="text-sm font-semibold mb-2 text-primary">Chair's Response:</p>
                          <p className="text-sm break-words whitespace-pre-wrap leading-relaxed" data-testid="text-committee-doubt-response">{doubt.response}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-2">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">No approved questions yet for your committee</p>
                <p className="text-sm text-muted-foreground">Be the first to ask a question!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
