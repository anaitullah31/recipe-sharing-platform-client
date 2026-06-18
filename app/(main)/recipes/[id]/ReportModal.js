"use client";

import { serverMutation } from "@/app/lib/core/server";
import { Flag, Xmark } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import {
  Button,
  Input,
  Label,
  Modal,
  Radio,
  RadioGroup,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useState } from "react";

const ReportButton = ({ recipe, user }) => {
  const [reason, setReason] = useState("Spam");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async () => {
    if (!user?.email) {
      alert("Please login first");
      return;
    }

    const reportData = {
      recipeId: recipe._id,
      recipeName: recipe.recipeName,
      userEmail: user.email,
      reason,
      comment,
    };

    try {
      setLoading(true);

      const data = await serverMutation("/reports", reportData, "POST");

      if (data.success) {
        alert("Report submitted successfully");
        setComment("");
        setReason("Spam");
      } else {
        alert(data.message || "Failed to submit report");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button className="ml-auto cursor-pointer transition hover:text-danger">
        <Icon data={Flag} size={17} />
      </Button>

      <Modal.Backdrop className="bg-black/45 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
            <Modal.CloseTrigger className="absolute right-6 top-6 cursor-pointer text-surface-secondary-foreground hover:text-danger">
              <Icon data={Xmark} size={18} />
            </Modal.CloseTrigger>

            <Modal.Header className="px-8 pt-8">
              <Modal.Heading className="font-serif text-xl text-foreground">
                Report Recipe
              </Modal.Heading>
              <p className="mt-1 text-sm text-surface-secondary-foreground">
                Help us maintain the RecipeHub community standards.
              </p>
            </Modal.Header>

            <Modal.Body className="px-8 py-6">
              <Surface variant="default" className="bg-transparent">
                <form className="flex flex-col gap-5">
                  <TextField name="recipeId" className="w-full">
                    <Label className="text-xs font-bold uppercase text-surface-secondary-foreground">
                      Recipe ID
                    </Label>
                    <Input
                      value={recipe?._id}
                      readOnly
                      className="mt-2 h-12 w-full border border-(--field-border) bg-surface-secondary px-4 text-sm outline-none"
                    />
                  </TextField>

                  <TextField name="email" className="w-full">
                    <Label className="text-xs font-bold uppercase text-surface-secondary-foreground">
                      Your Email
                    </Label>
                    <Input
                      value={user?.email || ""}
                      readOnly
                      placeholder="gourmet@recipehub.com"
                      className="mt-2 h-12 w-full border border-(--field-border) bg-(--field-background) px-4 text-sm outline-none"
                    />
                  </TextField>

                  <RadioGroup name="reason" value={reason} onChange={setReason}>
                    <Label className="mb-3 block text-xs font-bold uppercase text-surface-secondary-foreground">
                      Reason for Reporting
                    </Label>

                    <div className="flex flex-wrap gap-6">
                      {["Spam", "Offensive Content", "Copyright Issue"].map(
                        (item) => (
                          <Radio key={item} value={item}>
                            <Radio.Content className="flex items-center gap-2 text-sm text-foreground">
                              <Radio.Control>
                                <Radio.Indicator />
                              </Radio.Control>
                              {item}
                            </Radio.Content>
                          </Radio>
                        ),
                      )}
                    </div>
                  </RadioGroup>

                  <TextField name="comment" className="w-full">
                    <Label className="text-xs font-bold uppercase text-surface-secondary-foreground">
                      Additional Comments
                    </Label>
                    <TextArea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Please provide more details..."
                      className="mt-2 min-h-32 w-full resize-none border border-(--field-border) bg-(--field-background) p-4 text-sm outline-none focus:border-field-border-focus"
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="flex gap-4 px-8 pb-8">
              <Button
                slot="close"
                variant="secondary"
                className="h-12 flex-1 rounded border border-border bg-transparent text-sm font-bold uppercase text-surface-secondary-foreground"
              >
                Cancel
              </Button>

              <Button
                slot="close"
                onPress={handleSubmitReport}
                disabled={loading}
                className="h-12 flex-1 rounded bg-accent text-sm font-bold uppercase text-accent-foreground shadow-lg hover:bg-accent-hover disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </Modal.Footer>

            <div className="flex items-center justify-between bg-surface-secondary px-8 py-4 text-[10px] font-bold uppercase text-surface-secondary-foreground">
              <span>RecipeHub Community Safety</span>
              <span>Secure Report</span>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ReportButton;
